import { useState } from "react"
import Tab from "./Tab";
const Tabs = ({children}) => {
    const [active, setActive] = useState(children[0].props.label);
    const onClickTabItem = (tab) => {
        setActive(tab)
    }
    return (
        <div className="tabs">
            <ol className="tab-list">
                {children.map((child) => {
                    const {label} = child.props;

                    return (
                        <Tab 
                            activeTab={active}
                            key={label}
                            label={label}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </ol>
            <div className="tab-content">
                {children.map((child) => {
                    if(child.props.label !== active) return null;
                    return child.props.children;
                })}
            </div>
        </div>
    )
}

export default Tabs;