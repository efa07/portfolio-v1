async function captureLiquidGlass() {
  const newTargetRes = await fetch("http://localhost:9222/json/new?http://localhost:3001", { method: "PUT" });
  const target = await newTargetRes.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  const send = (method, params = {}) => new Promise((resolve) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener("message", handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  ws.onopen = async () => {
    await send("Page.enable");
    await send("DOM.enable");
    await send("Runtime.enable");

    // 1. Desktop 1440x900 Viewport
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await new Promise((r) => setTimeout(r, 1500));
    const fs = await import("node:fs");

    // Capture Hero with Liquid Glass Nav & Buttons
    let shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/home/server/.gemini/antigravity/brain/89a071a8-74da-4797-b614-e43ce0c1d63e/liquid-desktop-hero.png", Buffer.from(shot.data, "base64"));
    console.log("Captured liquid-desktop-hero.png");

    // Capture Projects Section with Liquid Glass controls
    await send("Runtime.evaluate", {
      expression: "document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' });"
    });
    await new Promise((r) => setTimeout(r, 1000));
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/home/server/.gemini/antigravity/brain/89a071a8-74da-4797-b614-e43ce0c1d63e/liquid-desktop-projects.png", Buffer.from(shot.data, "base64"));
    console.log("Captured liquid-desktop-projects.png");

    // Capture Contact Section with Liquid Glass CTA & Email card
    await send("Runtime.evaluate", {
      expression: "document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });"
    });
    await new Promise((r) => setTimeout(r, 1000));
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/home/server/.gemini/antigravity/brain/89a071a8-74da-4797-b614-e43ce0c1d63e/liquid-desktop-contact.png", Buffer.from(shot.data, "base64"));
    console.log("Captured liquid-desktop-contact.png");

    // Toggle Light mode and capture Hero
    await send("Runtime.evaluate", {
      expression: "document.documentElement.setAttribute('data-theme', 'light'); window.scrollTo(0, 0);"
    });
    await new Promise((r) => setTimeout(r, 800));
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/home/server/.gemini/antigravity/brain/89a071a8-74da-4797-b614-e43ce0c1d63e/liquid-light-mode.png", Buffer.from(shot.data, "base64"));
    console.log("Captured liquid-light-mode.png");

    // Switch back to Dark mode and reset scroll
    await send("Runtime.evaluate", {
      expression: "document.documentElement.setAttribute('data-theme', 'dark'); window.scrollTo(0, 0);"
    });
    await new Promise((r) => setTimeout(r, 600));

    // 2. Mobile 390x844 Viewport
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send("Runtime.evaluate", {
      expression: "window.scrollTo(0, 0);"
    });
    await new Promise((r) => setTimeout(r, 1000));
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/home/server/.gemini/antigravity/brain/89a071a8-74da-4797-b614-e43ce0c1d63e/liquid-mobile-hero.png", Buffer.from(shot.data, "base64"));
    console.log("Captured liquid-mobile-hero.png");

    // Open Mobile Drawer Menu
    await send("Runtime.evaluate", {
      expression: "document.querySelector('button[aria-label=\"Toggle navigation menu\"]')?.click();"
    });
    await new Promise((r) => setTimeout(r, 800));
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("/home/server/.gemini/antigravity/brain/89a071a8-74da-4797-b614-e43ce0c1d63e/liquid-mobile-menu-open.png", Buffer.from(shot.data, "base64"));
    console.log("Captured liquid-mobile-menu-open.png");

    console.log("All Liquid Glass audits captured!");
    process.exit(0);
  };
}

captureLiquidGlass().catch(e => {
  console.error("Error:", e);
  process.exit(1);
});
