import straight from "straight.js";

export default async function handler(req, res) {
  // if (req.method != "POST") return;

  if (!req?.body?.image) return res.json({ success: false, code: 1 });

  try {
    let opacity = 5;
    if (req.body.opacity && !Number.isNaN(parseInt(req.body.opacity)))
      opacity = parseInt(req.body.opacity);

    const sth = await straight.hetero(req.body.image, opacity);

    const out = sth.toString("base64");

    return res.send(out);
  } catch (e) {
    console.error(e);
    return res.json({ success: false, code: 2, message: String(e) });
  }
}
