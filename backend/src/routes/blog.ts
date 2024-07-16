import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@6dpixel/common-medium";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

//Middleware
blogRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ message: "not authorized" });
  }
  const token = jwt.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    //@ts-ignore
    c.set("userId", payload.id);
  } catch (e) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  await next();
});
//create
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "input error" });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({ id: post.id });
});
//update
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "input error" });
  }
  await prisma.post.update({
    where: {
      id: body.id,
      authorId: authorId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.text("updated");
});

//pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findMany({
    select:{
      title:true,
      content:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }
  });

  return c.json({ post });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({ post });
  } catch (e) {
    c.status(411);
    return c.json({ message: "error while fetching" });
  }
});
