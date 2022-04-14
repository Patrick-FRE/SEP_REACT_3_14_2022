export const PORPS_NAME = {
    CHILDREN: 'children',
    CLASS_NAME: 'className',
    EVENT_START_WITH: 'on',
    STYLE: 'style'
}


export const addStyleProps = (element, styleProps) => {
    Object.keys(styleProps).forEach((property) => {
        element.style.setProperty(property, styleProps[property])
    })
}

export const addEventProps = (element, eventProp) => {
    const eventType = eventProp.eventType
        .substring(2)
        .toLowerCase();
    element.addEventListener(
        eventType,
        eventProp.callback
    );
}


// utils
export const isChildrenProp = (prop) => prop === PORPS_NAME.CHILDREN;
export const isClassNameProp = (prop) => prop === PORPS_NAME.CLASS_NAME;
export const isStyleProp = (prop) => prop === PORPS_NAME.STYLE

export const isEventProp = (prop) => prop.startsWith(PORPS_NAME.EVENT_START_WITH)

export const isClassComponent = (type) => {
    return typeof type === 'function' && !!type.prototype.setState
}