

async function logout (req,res) {

    res.clearCookie('Token'); 
    return res.status(200).send('User logout successfully!');

}


export default logout;