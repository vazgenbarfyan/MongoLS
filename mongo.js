//const http = require('http');
// const fs   = require('fs');
// const url  = require('url');
const testObj ={ 
	1:	{_id:1,item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
	2:	{_id:2,item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
	3:	{_id:3, item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
	4:	{_id:4, item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
	5:	{_id:5, item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
}

const localMongo ={
	list : {},
	setItem : function(obj){
		this.list[obj._id] =obj ;
	},
	getItem : function(id){
		return this.list[id]
	},
	removeItem : function(id){
		delete this.list[id]
	},
	finder : function(query,obj){
					if(query[Object.keys(query)[0]]===obj[Object.keys(query)[0]])
			return true;
	},
	lessThan : function(a,b){
		if( a > b )
			return true;
	},
	lessThanEq : function(a,b){
		if( a > b )
			return true;
	},
	
	greaterThan : function(a,b){
		 	if( a < b )
			return true;
	},
	greaterThanEq : function(a,b){
		 	if( a <= b )
			return true;
	},
	equal : function(a,b){
		 	if( a === b )
			return true;
	},
	notEqual : function(a,b){
		 	if( a !== b )
			return true;
	},
	into : function(a,b){
		 	if( a[0]<b && b<a[1] )
			return true;
	},

	
	find:function(query){
		const that = this;
		const respective =[];			
		const keys = Object.keys(this.list);
		for(const key in query){
			keys.forEach(function(elem){		
				if(that.list[elem][key]){
					if (typeof query[key]==="object" && typeof that.list[elem][key] !=="object" ){
						const localVal =that.list[elem][key];
						const queryVal = query[key][Object.keys(query[key])[0]];
						if(Object.keys(query[key])[0] ==="$lt"){
							if(that.lessThan(queryVal,localVal)){
								respective.push(that.list[elem]);
								console.log(that.list[elem])
							}
						}
						else if(Object.keys(query[key])[0] ==="$gt"){
							if(that.greaterThan(queryVal,localVal)){
								respective.push(that.list[elem]);
								console.log(respective)
							}
						}
						else if(Object.keys(query[key])[0] ==="$gte"){
							if(that.greaterThanEq(queryVal,localVal)){
								respective.push(that.list[elem]);
								console.log(respective)
							}
						}
						else if(Object.keys(query[key])[0] ==="$lte"){
							if(that.lessThanEq(queryVal,localVal)){
								respective.push(that.list[elem]);
								console.log(respective)
							}
						}
						else if(Object.keys(query[key])[0] ==="$eq"){
							if(that.equal(queryVal,localVal)){
								respective.push(that.list[elem]);
								console.log(respective)
							}
						}
						else if(Object.keys(query[key])[0] ==="$ne"){
							if(that.notEqual(queryVal,localVal)){
								respective.push(that.list[elem]);
								console.log(respective)
							}
						}
						else if(Object.keys(query[key])[0] ==="$in"){
							if(that.into(queryVal,localVal)){
								respective.push(that.list[elem]);
								console.log(respective)
							}
						}

					}else{ 
						const localVal =that.list[elem][key];
						const queryVal = query[key]
						if(that.finder(localVal,queryVal)){
							respective.push(that.list[elem]	);
						}
					}
				}
				else{

				}
					
				
			})
		}
		uniqueArray = respective.filter(function(item, pos) {
				    return respective.indexOf(item) == pos;
				})
	return uniqueArray;	
		
	},
	finedOne: function(query){
		return this.find(query)[0];
	}
};
	localMongo.setItem(testObj[1]);
localMongo.setItem(testObj[2]);
localMongo.setItem(testObj[3]);
localMongo.setItem(testObj[4]);
localMongo.setItem(testObj[5]);

console.log(localMongo.find({qty:{$lt :40},item:"journal",status:"D"}))
/*
const localServer = http.createServer(function(req ,res){
		console.log(req.url);
		const uri = req.url.slice(1);

  		fs.readFile("index.html",function(err,data){
		if(err)
			throw err
		console.log("poncho");
		})

})

localServer.listen(8000)
console.log("server is running");

*/

