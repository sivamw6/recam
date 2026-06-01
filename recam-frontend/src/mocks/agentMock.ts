import type {
  Agent,
  CreateAgentPayload,
  UpdateAgentPayload,
} from "../types/agent";

const mockAgents: Agent[] = [
  {
    id: "1",
    firstName: "Emily",
    lastName: "Green",
    email: "emaily@emily.com",
    phoneNmuber: "0422992232",
    companyName: "Acne Studio",
    avatarUrl: undefined,
  },
];

export const getAgents = async (): Promise<Agent[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockAgents;
};

export const createAgent = async (
  payload: CreateAgentPayload,
): Promise<Agent> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const agent: Agent = {
    id: Date.now().toString(),
    ...payload,
    avatarUrl: payload.avatarUrl
      ? URL.createObjectURL(payload.avatarUrl)
      : undefined,
  };
  mockAgents.push(agent);
  return agent;
};

export const updateAgent = async (
  id: string,
  payload: UpdateAgentPayload,
): Promise<Agent> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index: number = mockAgents.findIndex((agent) => agent.id === id);

  const updatedAgent: Agent = {
    ...mockAgents[index],
    ...payload,
    avatarUrl: payload.avatarUrl
      ? URL.createObjectURL(payload.avatarUrl)
      : mockAgents[index].avatarUrl, // check whether the image updates, if not then keep the orignial one
  };
  mockAgents[index] = updatedAgent;
  return updatedAgent;
};

export const deleteAgent = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index: number = mockAgents.findIndex((agent) => agent.id === id);
  if (index === -1) {
    console.error(`The agent with ${id} is not found`);
  } else {
    mockAgents.splice(index, 1);
  }
};
