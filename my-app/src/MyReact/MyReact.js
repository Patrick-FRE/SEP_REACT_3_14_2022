


// UI <=> ReactFN(state)
import { isChildrenProp, isClassComponent, isClassNameProp, isEventProp, isStyleProp, addEventProps, addStyleProps } from './uitls'


// // mutable vs imutable

// let obj = { name: 'patrick', age: 17 };

// obj.age = 18; // mutable change

// obj = { ...obj, age: 18 } // imutable




const update = (ReactElement, ParentElement, isRoot = false, childrenIndex = 0) => {
    if (typeof ReactElement !== 'object') {
        const textContent = document.createTextNode(ReactElement);
        ParentElement.appendChild(textContent)
        return;
    }

    if (isClassComponent(ReactElement.type)) {
        // render Class Component
        const contructorFn = ReactElement.type
        const currentInstance = new contructorFn(ReactElement.props);
        currentInstance.vnode = { parentElement: ParentElement }
        contructorFn.getDerivedStateFromProps(currentInstance.props, currentInstance.state);
        const reactElement = currentInstance.render()
        update(reactElement, ParentElement, childrenIndex)
        if (currentInstance.componentDidUpdate) currentInstance.componentDidUpdate();
        return
    }

    if (typeof ReactElement.type === 'function') {
        console.log('Function compoent')
        const reactElement = ReactElement.type(ReactElement.props);
        update(reactElement, ParentElement)
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
                        update(reactElement, newElement, false, index)
                    })
                } else if (typeof childrenProp === "string" || typeof childrenProp === "number") {
                    const textContent = document.createTextNode(childrenProp);
                    newElement.appendChild(textContent)
                } else {
                    update(childrenProp, newElement)
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
    if (isRoot) {
        ParentElement.replaceChild(newElement, ParentElement.childNodes[childrenIndex]);
    } else {
        ParentElement.append(newElement);
    }
};



class Component {
    constructor(props) {
        this.props = props
    }

    setState(partialState) {
        this.state = {
            ...this.state,
            ...partialState
        }

        this.__proto__.constructor.getDerivedStateFromProps(this.props, this.state)
        if (this.shoudComponentUpdate(this.props, this.state)) {
            //render
            const reactElement = this.render();
            console.log("newReactElement", reactElement)
            console.log("oldReactElement", this.vnode.oldReactElement);
            // React is using diffing algrithm to find the diff between next VDOM, pre VDOM.
            update(reactElement, this.vnode.parentElement, true, this.vnode.childrenIndex)
        } else {
            return
        }
        // Lu: need rerender
        // Jifeng: Need NewState as peremeter, hanlder to change State
        // Brandon lifecycle

    }
}



const MyReact = {
    Component
}

export default MyReact

