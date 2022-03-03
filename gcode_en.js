window.onload=function ()
{
	crtboxes();
}
var t=175 , ns=27 , cs=0 , prizePut=false; 
var oriPos=[[10,10],[100,10],[190,10]];
var valPos=[[35,110],[35,200],[35,290],[125,110],[125,200],[125,290],[215,110],[215,200],[215,290]];
var np=[0,4,8];
var boxes=new Array();
function crtboxes()
{
	boxes.push($('#box0'));
	boxes.push($('#box1'));
	boxes.push($('#box2'));
}
$(document).ready  
(
	function()
	{
		$(".box").click
		(
			function()
			{
				if ($("#newGame").attr("disabled"))
				{
					if (cs<ns) 
					{				
						if (!prizePut)
						{
							prizePut=true;
							$(this).html('<img src="prize.jpg" width="76" height="76" align="top" alt="Prize" id="prize">');				
							setTimeout(function()
								{
									$('#prize').css('display','none');									
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
							$("#instr").css('color','green');					
							$("#instr").html('You Win!!');
							$("#instr").animate
							(
								{
									fontSize:'+=12pt'									
								}
								,1000								
							);
						}
						else
						{
							$('.box').children().css('display','inline');	
							$("#instr").css('font-size','24pt');
							$("#instr").css('color','red');	
							$("#instr").html('You loose.');
							$("#instr").animate
							(
								{
									fontSize:'-=16pt'									
								}
								,1000								
							);
						}
						setTimeout(function()
							{
								$("#newGame").attr("disabled",false);
								$(".def").removeAttr("disabled");
							}
							,1000);						
					}
				}
				else
				{
					alert("Click New Game First.");
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
					t=250;					
					break;
				case 2:
					ns=27;
					t=175;	
					break;
				case 3:
					ns=54;
					t=120;	
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
				$("#instr").html('Put Your Prize inside one of the boxes.');				
				$(this).attr("disabled",true);
				$(".def").attr("disabled", "disabled");
				bo=[[0,0],[1,1],[2,2]];				
				cs=0;
				prizePut=false;
				nextPos(8);
				$(".box").html('');
				$(this).attr("disabled",true);
			}
		);		
	}
);

function toMovePos()
{	
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
					$("#instr").html('Watch your prize.');					
				}
		);
	}
}
function toNormalPos()
{
	for (i=0;i<3;i++)
	{
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
				$("#instr").html('Where is your prize?');	
			}
		);		
	}
}
function boxShuffleToPos()
{
		if(cs==0)
		{				
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
			toNormalPos();
		}
		cs++;
}
function ShuffleToPos (b,j)
{
	boxes[b].animate
	(
		{
			left:valPos[j][0]+'px',				
			top:valPos[j][1]+'px'				
		}
		,t
		,function (){nextPos(8);}
	);
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
