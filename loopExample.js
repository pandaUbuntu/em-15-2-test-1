const starterTextArray = [
    "Unlimited personal files",
    "Email support",
    "CSV data export",
    "Basic analytics dashboard",
    "1,000 API calls per month",
    "Community support access",
    "Basic integrations with popular tools",
    "test"
];

const professionalTextArray = [
    "All starter features +",
    "Up to 5 user accounts",
    "Team collaboration tools",
    "Custom dashboards",
    "Multiple data export formats",
    "Basic custom integrations",
    "test"
];

const organizationTextArray = [
    "All professional features +",
    "Enterprise security suite",
    "Single Sign-On (SSO)",
    "Custom contract terms",
    "Dedicated phone support",
    "Custom integration support",
    "Compliance tools"
];

function generateListItem(list, sender) {
    list.forEach((feature, index) => {
        const listItem = document.createElement("li");
        
        if(index == 0){
            listItem.classList.add("highlight");
            listItem.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feature}`;
        } else {
            listItem.innerHTML = `<i class="fa-regular fa-circle-check"></i> ${feature}`;
        }
    
        sender.appendChild(listItem);
    });
}

const starterList = document.getElementById("starter-features");
const professionalList = document.getElementById("professional-features");
const organizationList = document.getElementById("organization-features");


starterTextArray.forEach((feature, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<i class="fa-regular fa-circle-check"></i> ${feature}`;
    starterList.appendChild(listItem);
});

generateListItem(professionalTextArray, professionalList);
generateListItem(organizationTextArray, organizationList)
