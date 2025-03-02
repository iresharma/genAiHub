import { json } from "@remix-run/node";
import { removeBackground } from "@imgly/background-removal-node";
// import { writeFileSync } from "fs";

export async function action({ request }: { request: Request }) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File)) {
      return json({ error: "No image file provided" }, { status: 400 });
    }

    // Check file type
    if (!imageFile.type.startsWith("image/")) {
      return json({ error: "Invalid file type" }, { status: 400 });
    }

    // Process image
    const processedImage = await removeBackground(imageFile);

    // Debug: Save processed image to filesystem
    // const debugFileName = `debug-${Date.now()}.png`;
    // writeFileSync(debugFileName, Buffer.from(await processedImage.arrayBuffer()));
    // console.log(`Debug: Saved processed image to ${debugFileName}`);

    // Return processed image with appropriate headers
    return new Response(processedImage, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${imageFile.name}-no-bg.png"`,
      },
    });
  } catch (error) {
    console.error("Background removal error:", error);
    return json({ error: "Failed to process image" }, { status: 500 });
  }
}
