import {
  getAgents as getAgentAPI,
  createAgent as createAgentAPI,
  updateAgent as updateAgentAPI,
  deleteAgent as deleteAgentAPI,
} from "../mocks/agentMock";
import type {
  Agent,
  CreateAgentPayload,
  UpdateAgentPayload,
} from "../types/agent";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AgentState {
  agents: Agent[] | null;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
}

const initialState: AgentState = {
  agents: null,
  isLoading: false,
  isMutating: false,
  error: null,
};

export const getAgents = createAsyncThunk(
  "agent/getAgents", // action name
  async () => {
    const agents = await getAgentAPI();
    return agents;
  },
);

export const createAgent = createAsyncThunk(
  "agent/createAgent",
  async (payload: CreateAgentPayload) => {
    const agent = await createAgentAPI(payload);
    return agent;
  },
);

export const updateAgent = createAsyncThunk(
  "agent/updateAgent",
  async ({ id, payload }: { id: string; payload: UpdateAgentPayload }) => {
    // createAsyncThunk only accept one argument, so here we wrap id and payload into an object
    const agent = await updateAgentAPI(id, payload);
    return agent;
  },
);

export const deleteAgent = createAsyncThunk(
  "agent/deleteAgent",
  async (id: string) => {
    await deleteAgentAPI(id);
    return id;
  },
);

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAgents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agents = action.payload;
      })
      .addCase(getAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Failed to fetch agents";
      })
      .addCase(createAgent.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.isMutating = false;
        state.agents = [...(state.agents ?? []), action.payload];
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.error.message ?? "Failed to create an agent";
      })
      .addCase(updateAgent.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.isMutating = false;
        state.agents =
          state.agents?.map((agent) =>
            agent.id === action.payload.id ? action.payload : agent,
          ) ?? [];
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.error.message ?? "Failed to update an agent";
      })
      .addCase(deleteAgent.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(deleteAgent.fulfilled, (state, action) => {
        state.isMutating = false;
        state.agents =
          state.agents?.filter((agent) => agent.id !== action.payload) ?? [];
      })
      .addCase(deleteAgent.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.error.message ?? "Failed to delete an agent";
      });
  },
});

export default agentSlice.reducer;
