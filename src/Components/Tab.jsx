
const Tab = ({activeTab, label, onClick}) => {

    const onclickHandler = () => {
        onClick(label);
    }

    let className = 'tab-list-item';
    if(activeTab === label){
        className += ' tab-list-active';
    }

    return (
        <button
            className={className}
            onClick={onclickHandler}
        >
            {label}
        </button>
    )
}

export default Tab;