const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nadeeb-api.azurewebsites.net/api";

interface ApiResponse {
  success: boolean;
  message: string;
}

async function postLead<T>(endpoint: string, data: T): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/market/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

export async function submitDelegateLead(data: Record<string, unknown>): Promise<ApiResponse> {
  return postLead("delegate", data);
}

export async function submitCompanyLead(data: Record<string, unknown>): Promise<ApiResponse> {
  return postLead("company", data);
}

export async function submitInvestorLead(data: Record<string, unknown>): Promise<ApiResponse> {
  return postLead("investor", data);
}
