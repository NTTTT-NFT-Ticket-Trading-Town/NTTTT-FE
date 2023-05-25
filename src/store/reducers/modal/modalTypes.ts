export interface ModalStateInterface {
  showModal: boolean;
  hp: number;
  message: string;
}

export type ModalPayload = Omit<ModalStateInterface, "showModal">;
