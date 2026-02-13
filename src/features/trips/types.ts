export interface TripUser {
	id: string;
	name: string;
	email: string;
	image?: string | null;
}

export interface Trip {
	id: string;
	title: string;
	description: string | null;
	coverImage: string | null;
	destination: string | null;
	destinationType?: string;
	currency?: string;
	budget: string | null;
	startDate: string;
	endDate: string;
	status: "active" | "inactive" | "completed";
	createdBy: string;
	updatedBy: TripUser | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTripPayload {
	title: string;
	description?: string;
	coverImage?: string;
	destination?: string;
	destinationType?: string;
	currency?: string;
	budget?: string;
	startDate: string;
	endDate: string;
}
