import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";
import {useContext} from "react";
import BadgerPreferenceSwitch from "../BadgerPreferenceSwitch";

function BadgerPreferencesScreen(props) {
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext)

    const handleToggle = (tag, newValue) => {
        setPrefs({...prefs, [tag]: newValue})
    }



    return <>
        {
            Object.keys(prefs).map((tag) => {
                return <BadgerPreferenceSwitch key={tag} initVal={prefs[tag]} prefName={tag}
                                               handleToggle={handleToggle}/>
            })}
    </>
}

export default BadgerPreferencesScreen;
