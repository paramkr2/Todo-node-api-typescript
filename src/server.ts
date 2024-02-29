import app from './index'
const port = 8000;
const server = app.listen( port , ()=>{
	console.log(`[server]:Server is running at port ${port}`)
});

module.exports = server 