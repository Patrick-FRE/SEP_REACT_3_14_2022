
import MyReact from './MyReact'

const render = (ReactElement, ParentElement) => {
    console.log('CHECK')
    if (isClassComponent(ReactElement.type)) {
        // render Class Component
        const contructorFn = ReactElement.type
        const currentInstance = new contructorFn(ReactElement.props)
        contructorFn.getDerivedStateFromProps(currentInstance.props, currentInstance.state);
        const reactElement = currentInstance.render()
        render(reactElement, ParentElement)
        currentInstance.componentDidMount();
        return
    }


    // create new Element
    const newElement = document.createElement(
        ReactElement.type
    );

    /// iterate props
    Object.keys(ReactElement.props).forEach(
        (key) => {
            if (isChildrenProp(key)) {
                const childrenProp = ReactElement.props[key]
                if (childrenProp instanceof Array) {
                    childrenProp.forEach(reactElement => {
                        render(reactElement, newElement)
                    })
                } else if (typeof childrenProp === "string") {
                    const textContent = document.createTextNode(childrenProp);
                    newElement.appendChild(textContent)
                } else {
                    render(childrenProp, newElement)
                }

            } else if (isClassNameProp(key)) {
                newElement.setAttribute(
                    'class',
                    ReactElement.props[key]
                );
            } else if (isEventProp(key)) {
                const eventProp = ReactElement.props[key]
                addEventProps(newElement, { eventType: key, callback: eventProp })
            } else if (isStyleProp(key)) {
                const styleProps = ReactElement.props[key]
                addStyleProps(newElement, styleProps)
            } else {
                newElement.setAttribute(
                    key,
                    ReactElement.props[key]
                );
            }
        }
    );

    ParentElement.append(newElement);
};

//
const PORPS_NAME = {
    CHILDREN: 'children',
    CLASS_NAME: 'className',
    EVENT_START_WITH: 'on',
    STYLE: 'style'
}


const addStyleProps = (element, styleProps) => {
    Object.keys(styleProps).forEach((property) => {
        element.style.setProperty(property, styleProps[property])
    })
}

const addEventProps = (element, eventProp) => {
    const eventType = eventProp.eventType
        .substring(2)
        .toLowerCase();
    element.addEventListener(
        eventType,
        eventProp.callback
    );
}


// utils
const isChildrenProp = (prop) => prop === PORPS_NAME.CHILDREN;
const isClassNameProp = (prop) => prop === PORPS_NAME.CLASS_NAME;
const isStyleProp = (prop) => prop === PORPS_NAME.STYLE

const isEventProp = (prop) => prop.startsWith(PORPS_NAME.EVENT_START_WITH)

const isClassComponent = (type) => {
    return typeof type === 'function' && type.prototype instanceof MyReact.Component
}




const ReactDOM = {
    render
}

export default ReactDOM


/// Refactoring: SOLID princle, DRY