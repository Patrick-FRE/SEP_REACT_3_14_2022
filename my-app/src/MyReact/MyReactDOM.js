
import MyReact from './MyReact'
import { isChildrenProp, isClassComponent, isClassNameProp, isEventProp, isStyleProp, addEventProps, addStyleProps } from './uitls'


const render = (ReactElement, ParentElement, childrenIndex = 0) => {
    if (typeof ReactElement !== 'object') {
        const textContent = document.createTextNode(ReactElement);
        ParentElement.appendChild(textContent)
        return;
    }

    if (isClassComponent(ReactElement.type)) {
        // render Class Component
        const contructorFn = ReactElement.type
        const currentInstance = new contructorFn(ReactElement.props);
        contructorFn.getDerivedStateFromProps(currentInstance.props, currentInstance.state);
        const reactElement = currentInstance.render()
        currentInstance.vnode = { parentElement: ParentElement, childrenIndex: childrenIndex, oldReactElement: reactElement }
        render(reactElement, ParentElement)
        currentInstance.componentDidMount();
        return
    }

    if (typeof ReactElement.type === 'function') {
        console.log('Function compoent')
        const reactElement = ReactElement.type(ReactElement.props);
        render(reactElement, ParentElement)
        return
    }


    // create new Element
    const newElement = document.createElement(
        ReactElement.type
    );

    console.log('CHECK', ReactElement, typeof ReactElement)

    /// iterate props
    Object.keys(ReactElement.props).forEach(
        (key) => {
            if (isChildrenProp(key)) {
                const childrenProp = ReactElement.props[key]
                if (childrenProp instanceof Array) {
                    childrenProp.forEach((reactElement, index) => {
                        render(reactElement, newElement, index)
                    })
                } else if (typeof childrenProp === "string" || typeof childrenProp === "number") {
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



const ReactDOM = {
    render
}

export default ReactDOM


/// Refactoring: SOLID princle, DRY