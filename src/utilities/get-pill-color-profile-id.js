import profiles from 'constants/pill-color-profiles';
import { find } from 'lodash';

export default function getPillColorProfileId(textColor) {
    const match = find(profiles, profile => profile.text.toLowerCase() === textColor.toLowerCase());

    return match.id;
}
