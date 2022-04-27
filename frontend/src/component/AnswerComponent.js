
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
    input1: {
        height: 10,


    },
    input2: {
        height: 200,
        fontSize: "3em"
    }
}));

export default function CheckboxList() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            {[0].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem>
                        <ListItemText
                            sx={{ textAlign: "center",width:"auto", border: "1px solid" , ml:0 , mr: 0}}
                            primary="1"
                        />
                        <ListItemText >
                             Question will come here
                        </ListItemText >

                        <ListItemText primary="July 20, 2014" />

                    </ListItem>
                );
            })}
        </List>
    );
}
