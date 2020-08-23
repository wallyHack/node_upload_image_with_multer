
// arranca la aplicación
import app from './app';
const path = require('path'); // une directorios

// settings
app.set('port', process.env.PORT || 3001);
app.set("json spaces", 2);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// starting the server
async function main(){
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
};

main();
