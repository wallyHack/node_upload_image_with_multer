
import { Router } from 'express';
const router = Router();

router.get('/', function(req, res){
    res.render('index');
});

router.post('/upload', function(req, res){
    console.log(req.file);
    res.send('uploaded...');
});

export default router;