const ClickBtn = document.querySelector(".click-btn");
const ContentDiv = document.querySelector(".content-div");

const intitalmsg = document.querySelector(".message");

ClickBtn.addEventListener("click", FetchData);

function FetchData() {
    ContentDiv.style.display = "block"; // Making content div visible
    intitalmsg.innerHTML = "Loading......";

    const fetchPromise = new Promise(function(resolve, reject){

        // Rejecting if fetching takes 5+ seconds
        const Timedout = setTimeout(() => {
            reject("Operation Timed Out");
        }, 5000)

        fetch("https://dummyjson.com/posts")
        .then(responses => {
            clearTimeout(Timedout);
            return responses.json();
        })
        .then(response => resolve(response.posts))
        .catch(error => reject(error)); //Error Handling
    })

    fetchPromise.then(data => {
        intitalmsg.textContent = "";

        // ******** Creating Heading and adding to html*******
        const TitleTag = document.createElement("h2");
        TitleTag.innerHTML = "Post Titles";
        TitleTag.style.textDecoration = "underline";
        ContentDiv.appendChild(TitleTag);

        // ********Iterating through each post and appending it to div********
        data.forEach(element => {
            const Ptag = document.createElement("p");
            Ptag.innerHTML = `Title-${element.id}: ${element.title}`;
            ContentDiv.appendChild(Ptag);
        });
    }).catch(response => {
        intitalmsg.textContent = `${response} .Try again after refreshing!`; // If failed to fetch 
    });

}