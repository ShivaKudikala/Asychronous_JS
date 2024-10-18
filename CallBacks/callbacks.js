
const ClickBtn = document.querySelector(".click-btn");
const ContentDiv = document.querySelector(".content-div");


ClickBtn.addEventListener("click", ImplementCallBack);

function ImplementCallBack() {

    ContentDiv.style.display = "block";
    const intialtext = document.querySelector(".p1tag");
    intialtext.textContent = "Result will be available after 5 seconds!"

    setTimeout(() => {
        fetch("https://dummyjson.com/posts")
            .then(responses => responses.json())
            .then(data => { 

                // ******** Creating Heading and adding to html*******
                const TitleTag = document.createElement("h2");
                TitleTag.innerHTML = "Post Titles";
                TitleTag.style.textDecoration = "underline";
                ContentDiv.appendChild(TitleTag);

                // ********Iterating through each post and appending it to div********
                data.posts.forEach(post => {
                intialtext.textContent = ""; // 
                const PostTitle = document.createElement("p");
                PostTitle.textContent = `Post-${post.id}: ${post.title}`;
                ContentDiv.appendChild(PostTitle);
                ClickBtn.disabled = true;  // ********Making button disable after first click****

            });
            })
            .catch(error => {intialtext.textContent = `Fetching Failed: ${error}`; //Error Handling
                ClickBtn.disabled = false; // If failed, Can Click again
            }
            );
    }, 5000)
}