import type { ComponentType as ReactComponent } from 'react'
import type { Component as SanComponent, DefinedComponentClass } from 'san'
export = seact;
export as namespace seact;

interface IPropType {
    children?: any,
    sModels?: {
        [key: string]: [any, any]
    }
}
declare namespace seact {
    const sanInReact: <T>(sanComponent: DefinedComponentClass<any,any>) => ReactComponent<IPropType & T>;
    const reactInSan: <T>(ReactComponent: ReactComponent<T>) => SanComponent;
}