import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editStudentById, editStudentDropDown, toggleEditComponent, } from '../../../../../actions';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';
import '../../mainStyle/mainTable.scss';
import { FormWrap, Input, Div, FormSet, ButtonDiv, CancelButton, SaveButton, Label } from '../../mainStyle/styledComponent';
import '../../../../../styles/table.scss';
import {createDropdown} from '../../../../../utils/helpers';
import { useForm } from 'react-hook-form';

const StudentForm = props => {
	const { studentID } = props;

	const student = props.studentById;

	let birthdate = new Date(student.birthdate).toISOString().split('T')[0];
	let grade_updated = new Date(student.grade_updated) .toISOString().split('T')[0];

	const { errors, register, handleSubmit } = useForm();
	const dropDowns = ['block_code', 'preferred_contact_type_id', 'school_grade_id', 'location_id', "family_id"];

	const submitNow = (data) => {
		for (const property of dropDowns) {
			data[property] = parseInt(data[property])
		}
		props.editStudentById(studentID, data);
	}

	useEffect(() => { props.editStudentDropDown(); }, []);

	const handleCancel = e => {
		props.toggleEditComponent('false', 'false');
	};

	const yesNoDropdown = [
		{ label: 'Yes', value: true },
		{ label: 'No', value: false }
	];

	return (
		<FormWrap onSubmit={handleSubmit(submitNow)}>
			<FormSet>
				<Div>
					<div>
						<Label>CPR</Label>
						<div>
							<Input type="text" placeholder="xxxxxxxxxx" className={errors.cpr && "input-error"} name="cpr" defaultValue={student.cpr} ref={register({required: true, minLength: 9, maxLength: 9})} />
							{errors.cpr && errors.cpr.type === "required" && 'CPR is required.'}
							{errors.cpr && (errors.cpr.type === "minLength" || errors.cpr.type === "maxLength") && 'CPR needs to be 9 characters'}
						</div>
					</div>
					<div>
						<Label>First Name</Label>
						<div>
							 <Input type="text" className={errors.first_name && "input-error"} name="first_name" defaultValue={student.first_name} ref={register({required: true, maxLength: 80})} />
							 {errors.first_name && errors.first_name.type === "required" && 'First name is required.'}
						</div>
					</div>
					<div>
						<Label>Additional Names</Label>
						<div>
							{/* regex pattern: 3 or more words, separated by spaces. Optional space at end so error border doesn't come up while typing more names.*/}
							<Input type="text" className={errors.additional_names && "input-error"}name="additional_names" defaultValue={student.additional_names} ref={register({required: true, pattern: /^([a-zA-Z]+ +){2,}([a-zA-Z]+ ?)$/i })} />
							{errors.additional_names && errors.additional_names.type === "required" && 'Additional Names are required.'}
							{errors.additional_names && errors.additional_names.type === "pattern" && 'Enter at least 3 additional names.'}
						</div>
					</div>
					<div>
						<Label>Gender</Label>
						<div>
							<select className='dropDown' name="gender" defaultValue={student.gender} ref={register({ required: true })}>
        						<option value="F">F</option>
        						<option value="M">M</option>
      						</select>
						</div>
					</div>
					<div>
						<Label>Home Telephone</Label>
						<div>
							<Input type="tel" className={errors.home_telephone && "input-error"}name="home_telephone" defaultValue={student.home_telephone} ref={register({required: true, maxLength: 100})} />
							{errors.home_telephone && errors.home_telephone.type === "required" && 'Home Telephone is required.'}	
						</div>
					</div>
					<div>
						<Label>Mobile Telephone</Label>
						<div>
							<Input type="tel" className={errors.mobile_telephone && "input-error"}name="mobile_telephone" defaultValue={student.mobile_telephone} ref={register({required: true, maxLength: 100})} />
							{errors.mobile_telephone && errors.mobile_telephone.type === "required" && 'Mobile Telephone is required.'}			
						</div>
					</div>
					<div>
					<Label>Email</Label>
						<div>
							<Input type="text" className={errors.email && "input-error"} name="email" defaultValue={student.email} ref={register({required: true, pattern: /^\S+@\S+$/i})} />
							{errors.email && 'Email is required.'}
						</div>
					</div>
					<div>
						<Label>Preferred Contact Method</Label>
						<div>	
							<select className='dropDown' name="preferred_contact_type_id" defaultValue={student.preferred_contact_type_id} ref={register({ required: true })}>
							{createDropdown(props.contactTypesTable)}
							</select>
						</div>
					</div>
					<div>
						<Label>Birth date</Label>
						<div>
							<Input type="date" className={errors.birthdate && "input-error"} name="birthdate" defaultValue={birthdate} ref={register({required: true})} />
							{errors.birthdate && 'Birth Date is required.'}
						</div>
					</div>
					<div>
						<Label>School Name</Label>
						<div>
							<Input type="text" className={errors.school_name && "input-error"}  name="school_name" defaultValue={student.school_name} ref={register({required: true})} />
							{errors.school_name && 'School Name is required.'}
						</div>
					</div>
					<div>
						<Label>School Grade</Label>
						<div>
							<select className='dropDown' name="school_grade_id" defaultValue={student.school_grade_id} ref={register({ required: true })}>
        						{createDropdown(props.schoolGradeTable)}
      						</select>
						</div>
					</div>
					<div>
						<Label>Location</Label>
						<div>					
							<select className='dropDown' name="location_id" defaultValue={student.location_id} ref={register({ required: true })}>
        						{createDropdown(props.locationsTable)}
      						</select>
						</div>
					</div>
					<div>
						<Label>Block</Label>
						<div>
							<select className='dropDown' name="block_code" defaultValue={student.block_code} ref={register({ required: true })}>
        						{createDropdown(props.blocksTable)}
								{errors.block_code && 'Block code is required.'}
      						</select>
						</div>
					</div>
					<div>
						<Label>Road</Label>
						<div>
							<Input type="text" className={errors.road && "input-error"} name="road" defaultValue={student.road} ref={register({required: true})}/>
							{errors.road && 'Road is required.'}
						</div>
					</div>
					<div>
						<Label>Building</Label>
						<div>
							<Input type="text" className={errors.building && "input-error"} name="building" defaultValue={student.building} ref={register({required: true})} />
							{errors.building && 'Building is required.'}
						</div>
					</div>
					<div>
						<Label>Flat</Label>
						<div>
							<Input type="text" className={errors.flat && "input-error"} name="flat" defaultValue={student.flat} ref={register({required: true})}/>
							{errors.flat && 'Flat is required.'}
						</div>
					</div>
					<div style={{ gridColumn: 'span 2' }}>
						<Label>Primary Emergency Contact Name</Label>
						<div>
							<Input type="text" className={errors.primary_emergency_contact_name && "input-error"} name="primary_emergency_contact_name" defaultValue={student.primary_emergency_contact_name} ref={register({required: true})} />
							{errors.primary_emergency_contact_name && 'Primary Emergency Contact Name is required.'}
						</div>
					</div>
					<div>
						<Label>Relationship</Label>
						<div>
							<Input type="text" className={errors.primary_emergency_relationship && "input-error"} name="primary_emergency_relationship" defaultValue={student.primary_emergency_relationship} ref={register({required: true})} />
							{errors.primary_emergency_relationship && 'Primary Emergency Relationship is required.'}
						</div>
					</div>
					<div>
						<Label>Phone Number</Label>
						<div>
							<Input type="tel" className={errors.primary_emergency_phone && "input-error"} name="primary_emergency_phone" defaultValue={student.primary_emergency_phone} ref={register({required: true})} />
							{errors.primary_emergency_phone && errors.primary_emergency_phone.type === "required" && 'Primary Emergency Phone is required.'}					
						</div>
					</div>
					<div style={{ gridColumn: 'span 2' }}>
						<Label>Emergency Contact Name</Label>
						<div>
							<Input style={{ width: '100%' }} type="text" name="emergency_contact_name" defaultValue={student.emergency_contact_name} ref={register} />
						</div>
					</div>
					<div>
						<Label>Relationship</Label>
						<div>
							<Input type="text"  name="emergency_relationship" defaultValue={student.emergency_relationship} ref={register} />
						</div>
					</div>
					<div>
						<Label>Phone Number</Label>
						<div>
							<Input type="tel" name="emergency_phone" defaultValue={student.emergency_phone} ref={register} />
						</div>
					</div>
					<div>
						<Label>Grade Updated</Label>
						<div>
							<Input type="date" name="grade_updated" defaultValue={grade_updated} ref={register({required: true})} />
						</div>
					</div>
					{/* <div>
						<Label>Registration Date</Label>
						<div>
							<Input type='date' name='registration_date' defaultValue={student.registration_date} ref={register()} />
						</div>
					</div> */}
					<div>
						<Label>No Call</Label>
						<div>
							<select className='dropDown' name="no_call" defaultValue={student.no_call} ref={register({ required: true })}>
								{createDropdown(yesNoDropdown)}
							</select>
						</div>
					</div>
					<div>
						<Label>Delinquent</Label>
						<div>
							<select className='dropDown' name="delinquent" defaultValue={student.delinquent} ref={register({ required: true })}>
								{createDropdown(yesNoDropdown)}
							</select>
						</div>
					</div>
					<div>
						<Label>Expelled</Label>
						<div>
							<select className='dropDown' name="expelled" defaultValue={student.expelled} ref={register({ required: true })}>
								{createDropdown(yesNoDropdown)}
							</select>
						</div>
					</div>
					<div style={{ gridColumn: 'span 4' }}>
						<Label>Notes</Label>
						<div>
							<textarea type="text" name="notes" defaultValue={student.notes} ref={register} className="student-form-notes"/>
						</div>
						<div>
							<Input type="hidden" value="1" name="family_id" defaultValue={student.family_id} ref={register({required: true})} />
						</div>
					</div>
				</Div>
			</FormSet>
			<ButtonDiv>
				<CancelButton onClick={handleCancel}>Cancel</CancelButton>
				<SaveButton type="submit" onClick={handleSubmit(submitNow)}>
					Save
				</SaveButton>
			</ButtonDiv>
		</FormWrap>
	);
};

const mapStateToProps = state => {
	return {
		studentById: state.studentByIdReducer.studentById,
		error: state.studentByIdReducer.error,
		schoolGradeTable: state.studentByIdReducer.schoolGradeTable,
		blocksTable: state.studentByIdReducer.blocksTable,
		contactTypesTable: state.studentByIdReducer.contactTypesTable,
		locationsTable: state.studentByIdReducer.locationsTable
	};
};

export default withRouter(
	connect(mapStateToProps, {
		editStudentById,
		toggleEditComponent,
		editStudentDropDown,
	})(StudentForm)
);