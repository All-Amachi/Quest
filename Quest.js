function getQueryVariable(variable)
{
   let query = window.location.search.substring(1);
   let vars = query.split("&");
   for (let i=0;i<vars.length;i++) {
       let pair = vars[i].split("=");
       if(pair[0] === variable){return pair[1];}
   }
   return(false);
}
let title = document.getElementsByTagName('h1')[0];
let text= document.getElementsByTagName('p')[0];
let link= document.getElementsByTagName('ul')[0];
let page={
	data: null,
	show(){
    for (let link in this.data["Links"]){
      //console.log(link +' '+this.data["Links"][link]);
    }
    text.textContent = this.data["Text"];
    title.textContent = this.data["Title"];
    for(let key in this.data["Links"]){
        link.innerHTML +=`<a href="Quest.html?p=${this.data["Links"][key]}">${key}</a><br/>` ;
}
		/*console.log(this.data["Text"]);
    console.log(this.data["Links"]);*/
    document.body.style.backgroundImage = `"url(${this.data["Image"]})"`;
	}
}
const db = firebase.database();
const ref = db.ref(`/page${Math.max(1,getQueryVariable('p'))}`);
ref.once('value', function(snapshot){
	page.data=snapshot.val();
	page.show();	
});

