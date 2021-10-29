/** DEPRECATED: Will migrate over to joi for schema validation  */
/** 
 * CRUD-based interfaces for user endpoint 
 */

/**
 * Base profile for which properties are common on the others
 */
interface BaseProfile {
  name: string;
  email: string;
  biography: string;
  university: string;
  password: string;
}

/** Student Interface */
interface BaseStudentProfile extends BaseProfile {
  major: string;
}

/** Create / Replace */
interface CreateStudentProfile extends BaseStudentProfile { }

/** Read / Get */
interface ReadStudentProfile {
  id: string,
  uuid?: string,
}

/** Update */
interface UpdateStudentProfile extends Omit<BaseStudentProfile, 'email' | 'password'> { }


/** Instructor interface */
interface BaseInstructorProfile extends BaseProfile {
  college: string;
}

/** Create / Replace */
interface CreateInstructorProfile extends BaseInstructorProfile { }


/** Update */
interface UpdateInstructorProfile extends Omit<BaseInstructorProfile, 'email' | 'password'> { }

/** Export a discriminated union of profile types */
export type CreateProfile = CreateStudentProfile | CreateInstructorProfile;
export type UpdateProfile = UpdateStudentProfile | UpdateInstructorProfile;

/** 
 * Service Interfaces 
 */

/** The base profile for qualified and unqualified profiles */
interface BaseProfileIdentity {
  publicId: string,
}

/** A profile with a unique identifier to validate operations on individual's profile */
export interface QualifiedProfile extends BaseProfileIdentity {
  uuid: string
}

/** A profile with no unique identifier for simple public profile retrieval */
export interface NonQualifiedProfile extends BaseProfileIdentity {
  uuid?: never
}


/** Export a discriminated union of profile identities, order matters */
export type ProfileIdentity = NonQualifiedProfile | QualifiedProfile;


/** 
 * Response format 
 */
export interface ResponseFormat {
  status: number,
  data: object
}
