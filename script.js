// let li=document.createElement('li');
//     let ol=document.createElement('ul');
//     ol.classList.add("ulStyle");
//    let img= document.createElement('img');
//    img.src="https://cataas.com/cat";
//    li.classList.add("imgStyle");
//    li.appendChild(img);
//    ol.appendChild(li);
//    let div = document.getElementsByClassName("content")[0];
//    div.appendChild(ol);
//    let hr=document.createElement('hr');
//    div.appendChild(hr);
let idArr=[];

//cataas.com/cat/json=true will return unique id of cat image each time it is called 
//https://cataas.com/cat/${id} - the above id is passed to the api to get a random cat image
async function fetchId(bool,i){
     await fetch(`https://cataas.com/cat?json=${bool}`)
    .then(response => response.json())
    .then(data => {
        // let imgURL = URL.createObjectURL(data);
        // let imgTag = document.createElement('img');
        // imgTag.src=imgURL;
        // let parentDiv = document.createElement('div');
        // parentDiv.classList.add("facts-flex");
        // parentDiv.classList.add("container");
    
        // let imgDiv= document.createElement('div');
        // imgDiv.classList.add("img");
        // imgDiv.appendChild(imgTag);
    
        // parentDiv.appendChild(imgDiv);
    
        // let factsDiv= document.getElementsByClassName("facts")[0];
        // factsDiv.appendChild(parentDiv);
        
        idArr.push(data.id);
      
        fetchImage(data.id,i);
    })
    .catch(error => console.log(error));
}

for(let i=0;i<=10;i++){
    fetchId(true,i);
}

//this api is used to fetch random cat fact
async function fetchFact(type,amt,i){
   
    // await fetch(`https://cat-fact.herokuapp.com/facts/random?animal_type=${type}&amount=${amt}`)
    await fetch(`https://meowfacts.herokuapp.com/`)
    .then(response => response.json())
    .then(data => {
      let textDiv = document.createElement('div');
      textDiv.classList.add("fact-text");
      let p = document.createElement('p');
      p.innerText=data.data.toString();

      textDiv.appendChild(p);

      //append cat image and fact to facts flex div
      let factsFlex= document.getElementsByClassName("facts-flex")[i];
      factsFlex.appendChild(textDiv);

    })
}

async function fetchImage(id,i){
    console.log(`id is ${typeof id}`);
    await fetch(`https://cataas.com/cat/${id}`)
    .then(response => response.blob())
    .then(data => {
        //create an url for image
        let imgURL = URL.createObjectURL(data);
        let imgTag = document.createElement('img');
        imgTag.src=imgURL;
        
        let parentDiv = document.createElement('Section');
        parentDiv.classList.add("facts-flex");
        parentDiv.classList.add("container");
    
         //append img src to img tag
        let imgDiv= document.createElement('div');
        imgDiv.classList.add("img");
        imgDiv.appendChild(imgTag);
    
        parentDiv.appendChild(imgDiv);
    
        let factsDiv= document.getElementsByClassName("facts")[0];
        factsDiv.appendChild(parentDiv);

        fetchFact("cat",1,i);
        
    })
    .catch(error => console.log(error));
}


