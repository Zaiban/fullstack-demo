import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';

function Welcome() {
    return (
        <div>
            <CssBaseline />
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto', // margin left & right
                    my: 4, // margin top & bottom
                    py: 3, // padding top & bottom
                    px: 2, // padding left & right
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
            >
                <Typography level="h4" component="h1">
                    <b>Tervetuloa!</b>
                </Typography>
                <Typography level="body-sm">Syötä työsuhdepyöräsi tiedot 🚲😊</Typography>
            </Sheet>
        </div>

    )
}
export default Welcome;