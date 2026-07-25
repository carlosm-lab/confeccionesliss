"use client";

import React from "react";
import { ChatTriggerButton } from "./ChatTriggerButton";
import { ChatModal } from "./ChatModal";

export function ChatWidget() {
  return (
    <>
      <ChatTriggerButton />
      <ChatModal />
    </>
  );
}
