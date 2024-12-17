export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    console.log("Received code:", code); 
    
    res.status(200).json({ message: 'Code received successfully', code });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}