import { Hono } from "hono";
import { getBlogPostById, getBlogPosts, updateBlogPost } from "./database";
import { jwtAuth, unauthorizedResponse, getUserFromToken } from "../../_common/auth";

const app = new Hono()
.get("/", async(c) => {
    const page = Number(c.req.param("page")) || 1;
    const perPage = Number(c.req.param("perPage")) || 20;
    const result = await getBlogPosts({ page, perPage });
    return c.json(result);
})
.get("/:id", async (c) => {
    const id = Number(c.req.param("id")); // Convert id to number
    if (isNaN(id)) {
        return c.json({ error: "Invalid ID" }, 400);
    }

    const post = await getBlogPostById(id);
    if (!post) {
        return c.json({ error: "Blog post not found" }, 404);
    }

    return c.json(post);
})
// PUT処理にJWT認証ミドルウェアを追加するのだ！
.put("/:id", jwtAuth, async (c) => {
    // トークンからユーザー情報を取得
    const user = getUserFromToken(c);
    if (!user) {
        return unauthorizedResponse(c);
    }
    
    const id = Number(c.req.param("id"));
    const body = await c.req.json();

    if (isNaN(id) || !body) {
        return c.json({ 
            success: false,
            message: "無効なリクエストなのだ..." 
        }, 400);
    }

    try {
        // 更新処理の前に必要なら権限チェックなどを行うことができるのだ
        // たとえば特定のユーザーにだけ編集を許可するなど
        
        const updatedPost = await updateBlogPost(id, body);

        if (!updatedPost) {
            return c.json({ 
                success: false, 
                message: "ブログ記事の更新に失敗したのだ..." 
            }, 500);
        }

        return c.json({ 
            success: true,
            message: "ブログ記事が更新されたのだ！🎉", 
            post: updatedPost,
            updatedBy: user.username
        });
    } catch (error) {
        console.error("ブログ更新エラー:", error);
        return c.json({
            success: false,
            message: `更新中にエラーが発生したのだ: ${error instanceof Error ? error.message : "不明なエラー"}`
        }, 500);
    }
});

export default app;