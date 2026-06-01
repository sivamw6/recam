export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNmuber: string;
  companyName: string;
  avatarUrl?: string;
}

// when admin send the form with agent data, will call createAgent(data), the id isn't exist yet. id is generate from backend, if use Agent as a type, TypeScript will force you to send an id but it is not exist, so we have to create a payload
// avatarUrl is set to File, is that when admin select an image, upload to database, will return URL like Agent.avatarUrl = "https://...."
export interface CreateAgentPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNmuber: string;
  companyName: string;
  avatarUrl?: File;
}

export interface UpdateAgentPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNmuber: string;
  companyName: string;
  avatarUrl?: File;
}
