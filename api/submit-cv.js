export default function handler(req, res) {
  if (req.method === 'POST') {
    const cvData = req.body;

    // For now, we just log it (Vercel will show it in function logs)
    console.log('CV Submitted:', cvData);

    res.status(200).json({ status: 'success', message: 'CV received!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
