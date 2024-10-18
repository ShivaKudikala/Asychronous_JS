
const ClickBtn = document.querySelector(".click-btn");
const ContentDiv = document.querySelector(".content-div");

const Intialtext = document.querySelector(".intial-text");

ClickBtn.addEventListener("click", ShowContent);

async function ShowContent() {
    
    ContentDiv.style.display = "block"; // Making content div visible

    Intialtext.innerHTML = "Loading....";

    try{

        const response = await fetch("https://dummyjson.com/posts"); // Waits until fetching is done

        const data = await response.json();

        Intialtext.textContent = " ";

        // ******** Creating Heading and adding to html*******
        const TitleTag = document.createElement("h2");
        TitleTag.innerHTML = "Post Titles";
        TitleTag.style.textDecoration = "underline";
        ContentDiv.appendChild(TitleTag);

        // ********Iterating through each post and appending it to div********
        data.posts.forEach(element => {
            const Ptag = document.createElement("p");
            Ptag.textContent = `Title-${element.id}: ${element.title}`;
            ContentDiv.appendChild(Ptag);
        });

    }catch(error){
        Intialtext.innerHTML = `Fetching Failed due to ${error}. Try again  after refreshing!`; //Error Handling
    }
    
}