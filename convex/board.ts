import { v } from "convex/values";
import { mutation } from "./_generated/server";
const images = ["/plceholders/img.png"];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name || "null",
      imageUrl: randomImage,
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const existingFavorite = await ctx.db.query("userFavorites")
    .withIndex("by_user_board", (q) =>
      q
        .eq("userId", identity.subject)
        .eq("boardId", args.id)
    )
    .unique();

  if (existingFavorite) {
    await ctx.db.delete(existingFavorite._id);

  }


    await ctx.db.delete(args.id);
    

  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const title = args.title.trim();
    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title is too long");
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favorite = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("board not found")
    }
    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q
          .eq("userId", userId)
          .eq("boardId", board._id)
          
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Board allready favorited")
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId
    })

    return board



  }
})

export const unFavorite = mutation({
  args: {
    id: v.id("boards"),

  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);
    if (!board) {
      throw new Error("board not found")
    }
    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q
          .eq("userId", userId)
          .eq("boardId", board._id)
        

      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Board not favorited")
    }

    await ctx.db.delete(existingFavorite._id);

    return board



  }
})


