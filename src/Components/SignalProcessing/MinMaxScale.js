import {MinMaxScaler} from "machinelearn/preprocessing";

export default ({s}) => {
    return new MinMaxScaler({featureRange: [0, 1]}).fit_transform(s);
}