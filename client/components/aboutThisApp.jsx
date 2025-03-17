const AboutThisApp = () => {

    return (
        <>
            <h3>About this app</h3>
            <p>This is a JavaScript app that uses a CI/CD pipeline through github, deployed on two EC2 instances in AWS.  The first instance hosts the React frontend.  The second instance runs an Express server, providing the API's that are called from the React frontend. Any changes committed to this github repository auto updates this app.</p>
            <p/>
            <a target="_blank" href="https://github.com/lukaneek/pizzas">Link To This Applications Repository</a>
        </>
    );
}

export default AboutThisApp;