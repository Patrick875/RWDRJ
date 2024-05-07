import { TwitterTimelineEmbed } from "react-twitter-embed";

interface Props {
	profile: string;
}

function TwitterTimeLine({ profile }: Props) {
	return (
		<TwitterTimelineEmbed
			sourceType="profile"
			screenName={profile}
			options={{
				height: "300",
			}}
		/>
	);
}

export default TwitterTimeLine;
