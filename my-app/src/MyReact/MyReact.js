const render = (ReactElement, ParentElement) => {
    const newElement = document.createElement(
        ReactElement.type
    );

    /// iterate props
    Object.keys(ReactElement.props).forEach(
        (key) => {
            if (key === 'children') {
                if (ReactElement.props[key] instanceof Array) {
                    ReactElement.props[key].forEach(reactElement => {
                        render(reactElement, newElement)
                    })
                } else if (typeof ReactElement.props[key] === "string") {
                    const textContent = document.createTextNode(ReactElement.props[key]);
                    newElement.appendChild(textContent)
                } else {
                    render(ReactElement.props[key], newElement)
                }

            } else if (key === 'className') {
                newElement.setAttribute(
                    'class',
                    ReactElement.props[key]
                );
            } else if (key.startsWith('on')) {
                const eventType = key
                    .substring(2)
                    .toLowerCase();
                console.log(eventType);
                newElement.addEventListener(
                    eventType,
                    ReactElement.props[key]
                );
            } else if (key === "style") {
                Object.keys(ReactElement.props[key]).forEach((property) => {
                    newElement.style.setProperty(property, ReactElement.props[key][property])
                })
            } else {
                newElement.setAttribute(
                    key,
                    ReactElement.props[key]
                );
            }
        }
    );

    // // and give it some content
    // const newContent = document.createTextNode("Hi there and greetings!");

    // // add the text node to the newly created div
    // newDiv.appendChild(newContent);

    ParentElement.append(newElement);
};

// ReactDOM.render(
//     Demo,
//     document.getElementById('root')
//   );

export default {
    render,
};
