////////////////////////////
////////////////////////////
///////My_1St_Game//////////
////////////////////////////
////////////////////////////

window.onload=function ()   //Events Can be put also in js file
{
	crtboxes();
}

////////////////////////////
////////////////////////////
///////////jquery///////////
////////////////////////////
////////////////////////////
var t=175 , ns=27 , cs=0 , prizePut=false; 
var valComb=[[1,2,0],[2,0,1]];
var oriPos=[[10,10],[100,10],[190,10]];
var valPos=[[35,110],[35,200],[35,290],[125,110],[125,200],[125,290],[215,110],[215,200],[215,290]];
var bo=[[0,0],[1,1],[2,2]];
//var boxes=[$('#box0'),$('#box1'),$('#box2')];
//'var boxes=[document.getElementById('#box0'),document.getElementById('#box1'),document.getElementById('#box2')];
var np=[0,1,2];
var boxes=new Array();
var nBoxes=new Array();
function crtboxes()
{
	boxes.push($('#box0'));
	boxes.push($('#box1'));
	boxes.push($('#box2'));
	nBoxes.push($('#box0'));
	nBoxes.push($('#box1'));
	nBoxes.push($('#box2'));
}
function rstnBoxes()
{
	nBoxes[0]=boxes[0];
	nBoxes[1]=boxes[1];
	nBoxes[2]=boxes[2];
	nextPos(8);
}
/*
120
201
*/
//var allcomb=new Array();
// function crtallcomb()
// {
	// for (i=0;i<3;i++)
	// {
		// for (j=0;j<3;j++)
		// {
			// for (k=0;k<3;k++)
			// {
				// if (!((i==j||j==k||k==i)||(i==0||j==1||k==2)))
				// {
					// x=allcomb.push([i,k,j]);
				// }
			// }
		// }
	// }
	// alert(x);	
// }
$(document).ready  //This is to prevent any jQuery code from running before the document is finished loading (is ready).
(
	function()
	{
		$(".box").click
		(
			function()
			{
				if ($("#newGame").attr("disabled"))
				{
					if (cs<ns) //Add another condition
					{				
						if (!prizePut)
						{
							prizePut=true;
							$(this).html('<img src="prize.jpg" width="76" height="76" align="top" alt="Prize" id="prize">');				
							setTimeout(function()
								{
									$('#prize').css('display','none');
									//boxShuffle();							
									boxShuffleToPos();
								}
								,3000);
						}
					}
					else
					{						
						if ($(this).children().length==1)
						{
							$(this).children().css('display','inline');
							$("#instr").css('font-size','4pt');
							$("#instr").css('color','green');					
							$("#instr").html('أنت قوي الملاحظة , لقد ربحت الجائزة!!!');
							$("#instr").animate
							(
								{
									fontSize:'+=12pt'									
								}
								,2000
								//,function (){}
							);
						}
						else
						{
							$('.box').children().css('display','inline');	
							$("#instr").css('font-size','24pt');
							$("#instr").css('color','red');	
							$("#instr").html('العب مرة أخرى و راقب جيدا.');
							$("#instr").animate
							(
								{
									fontSize:'-=16pt'									
								}
								,2000
								//,function (){}
							);
						}
						setTimeout(function()
							{
								$("#newGame").attr("disabled",false);
								$(".def").removeAttr("disabled");
							}
							,2000);						
					}
				}
				else
				{
					alert("انقر على بدء اللعبة أولا!");
				}
			
			}
		);
		$(".def").click
		(
			function()
			{
				d=parseInt($(this).val());
				switch(d)
				{
				case 1:
					ns=9;
					t=512;					
					break;
				case 2:
					ns=27;
					t=256;	
					break;
				case 3:
					ns=54;
					t=128;	
					break;		
				}
			}
		);
		$("#newGame").click
		(
			function()
			{
				$("#instr").css('color','black');	
				$("#instr").css('font-size','12pt');	
				$("#instr").html('ضع جائزتك في الصندوق.');				
				//ns=parseInt($("#ns").val());
				//	t=parseInt($("#t").val());
				
				//console.log($("#cs").val()+','+$("#t").val());
				$(this).attr("disabled",true);
				$(".def").attr("disabled", "disabled");
				bo=[[0,0],[1,1],[2,2]];				
				cs=0;
				prizePut=false;
				rstnBoxes();
				$(".box").html('');
				$(this).attr("disabled",true);

			}
		);
		//Add more jquery code before this line
	}
);

function toMovePos()
{
	// var i=((b.css("left")).match(/[0-9]+/)-10)/90;	
	for (i=0;i<3;i++)
	{
		boxes[i].animate
		(
			{
				top:'+='+(100+(i*60))+'px',
				left:'+=25px',
				height:'26px',
				width:'26px'
			}
			,t
			,function () 
				{
					$("#instr").html('راقب جائزتك.');
					//blink added
				}
		);
	}
}
/*function toNormalPos()
{
	// var i=((b.css("left")).match(/[0-9]+/)-35)/90;	
	for (i=0;i<3;i++)
	{
		boxes[i].animate
		(
			{
				top:'10px',
				left:'-=25px',
				height:'76px',
				width:'76px'
			}
			,t
			,function (){$("#instr").html('Where is your prize?');	}
		);
	}
}
function boxShuffle()
{
	// for (i=0;i<ns;i++)
	// {
		if(cs==0)
		{	
			toMovePos();
		}
		for (k=0;k<3;k++)
		{
			console.log('box'+k+'='+bo[k][0]+','+bo[k][1]);			
			ShuffleToH(k,valComb[0][bo[k][0]]);
			ShuffleToV(k,valComb[1][bo[k][1]]);			
			// ShuffleToH(bo[k][0],valComb[0][bo[k][0]]);
			// ShuffleToV(bo[k][1],valComb[1][bo[k][1]]);			
			// ShuffleToH(boxes[bo[k]],valComb[0][k]);
			// ShuffleToV(boxes[bo[k]],valComb[1][k]);
			// if (k==2)
			// {
				// ShuffleToV(boxes[bo[k]],valComb[1][k],boxSort);
			// }
			// else
			// {
				// ShuffleToV(boxes[bo[k]],valComb[1][k]);
			// }
		}
		cs++;
		if (cs==0)
		{
			setTimeout(function(){boxShuffle();},(3*t+10));
		}		
		else if (cs<ns)
		{
			setTimeout(function(){boxShuffle();},(2*t+10));
		}
		else
		{
			toNormalPos();
		}
	// }
}
// function caller(f) {
    // // Call the given function
    // f();
// }
function boxSort(j)
{
	// for (j=0;j<3;j++)
	// {
		//bo[j]=(((boxes[j].css("left")).match(/[0-9]+/)-35)/90);
		bo[j][0]=(parseInt(boxes[j].css("left"))-35)/90;
		bo[j][1]=(parseInt(boxes[j].css("top"))-110)/90;
		nBoxes[bo[j][0]]=boxes[j];
		console.log('called');
		//alert('called');
	// }
}
function ShuffleToH(b,j)
{
	//var i=((b.css("left")).match(/[0-9]+/)-35)/90;
	//var i=(parseInt(b.css("left"))-35)/90;
	if(j==0||j==1||j==2)
	{
		if (bo[b][0]!=j)
		{
			nBoxes[b].animate
			(
				{
					left:(35+(j*90))+'px',				
				}
				,t
				//,function (){boxSort();}
			);
		}
	}
}
function ShuffleToV(b,j)
{
	//var i=((b.css("top")).match(/[0-9]+/)-110)/90;
	//var i=(parseInt(b.css("top"))-110)/90;
	if(j==0||j==1||j==2)
	{
		if (bo[b][1]!=j)
		{
			nBoxes[b].animate
			(
				{
					top:(110+(j*90))+'px',				
				}
				,t
				//,function (){caller(f);}
				,function (){boxSort(b);}
			);
		}
	}
}*/
// function toMovePos2()
// {
	// for (i=0;i<3;i++)
	// {
		// boxes[i].animate
		// (
			// {
				// left:valPos[i][0]+'px',				
				// top:valPos[i][1]+'px',
				// height:'26px',
				// width:'26px'
			// }
			// ,t
			// ,function () 
				// {
					// $("#instr").html('Watch your prize.');
					// //add blink
				// }
		// );
	// }
// }
function toNormalPos2()
{
	// var i=((b.css("left")).match(/[0-9]+/)-35)/90;	
	for (i=0;i<3;i++)
	{
		//ori=0;
		//bo[j][0]=(parseInt(boxes[j].css("left"))-35)/90;
		clearInterval(bInter);
		boxes[i].animate
		(
			{
				left:oriPos[np[i]][0]+'px',				
				top:oriPos[np[i]][1]+'px',	
				height:'76px',
				width:'76px'
			}
			,t
			,function ()
			{
				$("#instr").css('color','black');
				$("#instr").html('أين جائزتك؟');	
			}
		);
		//ori++;
	}
}
function boxShuffleToPos()
{
		if(cs==0)
		{	
			nextPos(2);
			bInter=setInterval(
				function () 
				{
					document.getElementById('instr').style.color=(document.getElementById('instr').style.color!='transparent')?'transparent':'#0000ff';
				}
			,500); 
			toMovePos();
		}
		for (k=0;k<3;k++)
		{  
			ShuffleToPos(k,np[k]);			
			console.log('nbox'+k+'='+np[k]);
		}
		if (cs==0)
		{
			setTimeout(function(){boxShuffleToPos();},(2*t+10));
		}		
		else if (cs<ns)
		{
			setTimeout(function(){boxShuffleToPos();},(t+10));
		}
		else
		{
			nextPos(2);
			toNormalPos2();
		}
		cs++;
}
function ShuffleToPos (b,j)
{
	// if(j==0||j==1||j==2)
	// {
		// if (bo[b][1]!=j)
		// {
			nBoxes[b].animate
			(
				{
					left:valPos[j][0]+'px',				
					top:valPos[j][1]+'px'				
				}
				,t
				,function (){nextPos(8);}
			);
		// }
	// }
}
function nextPos(y)
{
	for (i=0;i<3;i++)
	{
		x=Math.round(Math.random()*y);
		switch(i)
		{
		case 0:
			np[i]=x;
			break;
		case 1:
			do
			{
				x=Math.round(Math.random()*y);
			}
			while (x==np[0]||x==np[1]);			
			np[i]=x;
			break;
		case 2:
			do
			{			
				x=Math.round(Math.random()*y);
			}
			while (x==np[0]||x==np[1]||x==np[1]);	  
			np[i]=x;
			break;		
		}
	}
}