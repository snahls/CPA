var express = require('express');
var app=express();
var path=require('path');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
var cors = require('cors');
router.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(express.static(__dirname + "/views"));
// app.set("view engine", "ejs");

router.post('/details', function(req, res){
	console.log(req.body);
	if(req.body.opt == "COMPANY")
	{
	cname = (req.body.cname);
	//url = 'https://www.zaubacorp.com/companysearchresults/' + JSON.stringify(cname);
	url='https://corporatedir.com/'+cname;
	console.log(url);
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var table;
			var title;
		    if($('#myTable').length != 0){
					
			    $('#myTable').filter(function(){
					var data = $(this);
					console.log("here");
					url = data.find("a").first().attr("href");
					console.log("hahf");
					console.log(url);
					request(url, function(error, response, html){
						if(!error){
							console.log("Welcome to err");
							var $ = cheerio.load(html);
							var table;
							$('html').filter(function(){
								var html = $(this);
								// title = html.find('title').html();
								// heading=html.find('div.panel-heading').html();
								// table = (html.find('table').first().html());
								// about = html.find('div.panel-body').html(); 

								title = html.find('title').text();
								heading=html.find('div.panel-heading').text();
								table = html.find('table').html();
								about = html.find('div.panel-body').text(); 
							   // console.log(table);
				
							
							})
						//res.render('data',{title:title,h2:heading,table:table,div:about});	
						 res.send({title:title,h2:heading,table:table,div:about});
						//console.log("END");
						//res.send(true);
			
		    }
				else
					res.status(404).send('Company Not Found!');
			
				})


			})
		}
		else{
			title = "Company Not Found";
			heading="";
			table = "";
			about = "";
			res.send({title:title,h2:heading,table:table,div:about});

		}
	  }
    })
  
}
else{
	cname = (req.body.cname);
	//url = 'https://www.zaubacorp.com/companysearchresults/' + JSON.stringify(cname);
	url='https://corporatedir.com/officer/'+cname;
	console.log(url);
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var table;
			var title;
		    if($('#myTable').length != 0){	
			    $('#myTable').filter(function(){
					var data = $(this);
					console.log("here");
					url = data.find("a").first().attr("href");
					console.log("hahf");
					console.log(url);
					request(url, function(error, response, html){
						if(!error){
							var $ = cheerio.load(html);
							var table;
							$('html').filter(function(){
								var html = $(this);
								title = html.find('title').first().text();
								heading=html.find('div.panel-heading').text();
								table = html.find('table').html();
								about = html.find('div.panel-body').text();
							})
			                //res.render('data', {title:title, table: table, div : about,h2:heading});	
			                res.send({title:title,h2:heading,table:table,div:about});		
			         	}
				        else{
							title = "No Director Found";
							heading="";
							table = "";
							about = "";
							res.send({title:title,h2:heading,table:table,div:about});
							//res.send('Director Not Found!');
				        }
					
			
				})
			})
	
		}		
		else{
			title = "Director Not Found";
			heading="";
			table = "";
			about = "";
			res.send({title:title,h2:heading,table:table,div:about});

		}


	  }
	 

    })


}

});




router.post("/analysis",(req,res)=>{
    console.log(req.body);
	var data=req.body.compName;
	var url= "https://in.indeed.com/cmp/"+data+"/reviews";
	request(url,(err,response,html) => {
  
	if(!err){
		 const ae=cheerio.load(html);
		 const review=ae('.cmp-NewLineToBr');
		 
  
		//console.log(review.html());
		 
		var result = sentiment.analyze(review.text());
		//console.log(result);
		//console.log(typeof(result));
		var score=result.score;
		var comparative=result.comparative;
		var text=review.text();
		//console.log(score,comparative);
		//res.send(" SCORE : " + JSON.stringify(score) + " COMPARATIVE : " + JSON.stringify();
        //res.send(review.text());
		res.send({score : score, comparative : comparative });
	 }
 });

})

module.exports = router;