/* Usage

// hooks
import { useMedia } from 'src/hooks/useMedia'

function demo() {
	const media = useMedia();
	const isMobile = media.down.sm

		console.warn(media)

		// Response:
		// "up":{"xs":true,"sm":true,"md":true,"lg":false,"xl":false},
		// "down":{"xs":false,"sm":false,"md":true,"lg":true,"xl":true},

	return (
		<div>

			{media.up.sm && (
				<div>
					Over sm
				</div>
			)}
			{media.down.sm && (
				<div>
					Less then sm
				</div>
			)}

			<br />
			{JSON.strinigy(media)}
		</div>
	)
}

*/

// Mui
// import { useTheme, ThemedProps } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'


interface MediaItem {
	xs: boolean
	sm: boolean
	md: boolean
	lg: boolean
	xl: boolean
	xxl: boolean
	[key: string]: boolean
}

interface MediaDict {
	up: MediaItem
	down: MediaItem
	only: MediaItem
}

export const useMedia = () => {
	// const theme: ThemedProps = useTheme();

	const matches = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

	const res: MediaDict | any = {
		up: {},
		down: {},
		only: {},
	}
	for (const i of matches) {
		res.up[i] = useMediaQuery((theme: any) => theme.breakpoints.up(i))
		res.down[i] = useMediaQuery((theme: any) => theme.breakpoints.down(i))
		res.only[i] = useMediaQuery((theme: any) => theme.breakpoints.only(i))
	}

	return res as MediaDict
}
