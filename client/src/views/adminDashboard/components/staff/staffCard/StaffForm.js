import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editStaffById, toggleStaffEditComponent } from '../../../../../actions';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Segment, Input, Icon, Form } from 'semantic-ui-react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {  Button } from '../../mainStyle/styledComponent.js';


const StaffForm = props => {
    const { staffID } = props;

    const [state, setState] = useState({
        id: props.staffById.id,
        name: props.staffById.name,
        short_name: props.staffById.short_name,
        cpr: props.staffById.cpr,
        mobile_number: props.staffById.mobile_number,
        gender: props.staffById.gender,
        accent: props.staffById.accent,
        gender: props.staffById.gender,
        mobile_number: props.staffById.mobile_number,
        teaching_rate: props.staffById.teaching_rate,
        admin: props.staffById.admin,
        active: props.staffById.active,
        user_id: props.staffById.user_id
    })

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = e => {
        e.preventDefault();
        props.editStaffById(staffID, state)
    }

    const closeBtn = e => {
        e.preventDefault()
        props.toggleStaffEditComponent()
    }

    const testArr = ['yep', 'yep']

    return(
        <div className="ui segment active tab editForm" style={{ margin: '3%'}}>
            <Grid columns='equal' style={{ marginRight: '3.5%', marginLeft: '3.5%', padding: '1%'}}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>Staff ID</Segment>
                        <Input 
                        type='text'
                        name='id'
                        placeholder='Staff Id'
                        onChange={handleChange}
                        value={state.id}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Segment>Name</Segment>
                    <Input 
                        type='text'
                        name='name'
                        placeholder='Name'
                        onChange={handleChange}
                        value={state.name}
                    />
                </Grid.Column>


                <Grid.Column>
                    <Segment>Short Name</Segment>
                    <Input 
                        type='text'
                        name='short_name'
                        placeholder='Short Name'
                        onChange={handleChange}
                        value={state.short_name}
                    />
                </Grid.Column>
                <Grid.Column>
                <Segment>CPR</Segment>
                    <Input 
                        type='text'
                        name='cpr'
                        placeholder='CPR'
                        onChange={handleChange}
                        value={state.cpr}
                    />
                </Grid.Column>
{/* 
                <Grid.Column >
                    <Segment.Group horizontal style={{ background: "#E0EBF0" }}>
                        <Segment.Inline onClick={formSubmit} style={{ color: "#26ABBD", cursor: "pointer", width: "fit-content" ,margin: 0}}>
                        <Icon name="save" tyoe='submit' style={{ color: "#26ABBD", cursor: "pointer" }} /> Save
                        </Segment.Inline>
                        <Segment.Inline onClick={closeBtn} style={{ color: "#C73642", cursor: "pointer", width: "fit-content", "margin-left": "10px" }}>
                        <Icon name="cancel" style={{ color: "#C73642", cursor: "pointer" }}  /> Cancel
                        </Segment.Inline>
                        </Segment.Group>
                </Grid.Column> */}
                </Grid.Row>

                <Grid.Row>
                <Grid.Column>
                    <Segment>Mobile Number</Segment>
                    <Input 
                        type='text' //use date for calendar
                        name='mobile_number'
                        placeholder='Mobile Number'
                        onChange={handleChange}
                        value={state.mobile_number}
                    />
                </Grid.Column>
    
                <Grid.Column>
                    <Segment>Accent</Segment>
                    <Dropdown
                        onChange={handleChange}
                        value={state.accent}
                        controlClassName='myControlClassName'
                        className='dropdown'
                        options={testArr}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Segment>Gender</Segment>
                    <Dropdown 
                        // onChange={handleChange}
                        onChange={(e) => setState({ ...state, gender: e })}
                        controlClassName='myControlClassName'
                        className='dropdown'
                        options={testArr}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Segment>Birthdate</Segment>
                    <Input 
                        type='date'
                        name='birthdate'
                        placeholder='birthdate'
                        onChange={handleChange}
                        value={state.birthdate}
                    />
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column>
                    <Segment>Teaching Rate</Segment>
                    <Input 
                        type='text'
                        name='teaching_rate'
                        placeholder='Teaching Rate'
                        onChange={handleChange}
                        value={state.teaching_rate}
                    />
                </Grid.Column>
              
                <Grid.Column>
                    <Segment>Admin</Segment>
                    <Input 
                        type='text'
                        name='admin'
                        placeholder='Admin'
                        onChange={handleChange}
                        value={state.admin}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Segment>Active</Segment>
                    <Input 
                        type='text'
                        name='active'
                        placeholder='active'
                        onChange={handleChange}
                        value={state.active}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Segment>User Id</Segment>
                    <Input 
                        type='text'
                        name='user_id'
                        placeholder='User Id'
                        onChange={handleChange}
                        value={state.user_id}
                    />
                </Grid.Column>
            </Grid.Row>
            </Grid>
            <div style={{ alignSelf: 'flex-end' }}>
            <Button onClick={closeBtn} style={{ background: '#C73642',  color:'#FFFFFF', width: '80px', marginBottom: '2%'}}>
                Cancel
            </Button>
            <Button type="submit" onClick={formSubmit} style={{ background: '#E0EBF0', color: '#26ABBD', marginBottom: '2%'}}> 
                Save
            </Button>
        </div>
        </div>
    )
}



    

export default withRouter(
    connect(
        null,
        {editStaffById, toggleStaffEditComponent}
    )(StaffForm)
)