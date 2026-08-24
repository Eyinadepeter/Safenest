"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  getMyProfile,
  updateMyProfile,
  type UserProfile,
} from "../lib/userSettingsApi";
import type { DemoAccount } from "../lib/demo-auth";

interface ProfileTabProps {
  account: DemoAccount;
}

export default function ProfileTab({ account }: ProfileTabProps) {
  const [fullName, setFullName] = useState(account.fullName);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(account.email);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Try to load the real profile; fall back to the demo account's values
  // (already set as initial state above) if the backend isn't reachable.
  useEffect(() => {
    getMyProfile()
      .then((profile: UserProfile) => {
        setFullName(profile.fullName);
        setPhone(profile.phone);
        setEmail(profile.email);
      })
      .catch(() => {
        // Keep the demo-account fallback values already in state.
      });
  }, []);

  const handleSave = async () => {
    setMessage(null);
    setError(null);
    setIsSaving(true);
    try {
      await updateMyProfile({ fullName, phone });
      setMessage("Profile updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  // Photo upload isn't backed by any documented endpoint yet — this is a
  // client-side-only preview, not a real upload.
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="text-sm text-slate-500">Update your personal information.</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-slate-200">
          {photoPreview ? (
            <Image
              src={photoPreview}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 object-cover"
            />
          ) : null}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-navy px-5 py-2 text-sm font-semibold text-navy transition hover:bg-slate-50"
        >
          Change Photo
        </button>
        <button
          type="button"
          onClick={() => setPhotoPreview(null)}
          className="rounded-lg border border-red-400 px-5 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          Remove Photo
        </button>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-base font-medium text-navy">Full name</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-teal-dark/40 px-4 py-3 text-sm text-navy focus:border-teal-dark focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-base font-medium text-navy">
            Phone number
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-lg border border-teal-dark/40 px-4 py-3 text-sm text-navy focus:border-teal-dark focus:outline-none"
          />
        </label>

        <label className="block sm:col-span-1">
          <span className="text-base font-medium text-navy">
            Email address
          </span>
          <input
            type="email"
            value={email}
            disabled
            readOnly
            className="mt-2 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
          />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mt-4 text-sm text-teal-dark">{message}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        className="mt-6 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
