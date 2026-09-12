import { useState } from "react"
import {
    Code2,
    Pencil,
    MapPin,
    GraduationCap,
    Globe2,
    Building2,
    Flame,
    Trophy,
    Medal,
    Zap,
    ExternalLink,
    Link2,
    Unlink,
    Check,
    X,
    Save,
    ShieldCheck,
    User,
    AtSign,
} from "lucide-react"


/* ============================================================= */
/* DATA                                                          */
/* ============================================================= */

const initialProfile = {
    name: "Aman Kumar",
    username: "amankumar_1305",
    email: "aman.kumar@codesync.edu",
    batch: "SOTB1 (2025)",
    city: "Noida",
    branch: "Computer Science",
    photo: "",
}

const codingAccounts = [
    {
        id: "leetcode",
        name: "LeetCode",
        username: "amankr",
        icon: Code2,
        iconClass: "text-amber-400",
        bgClass: "bg-amber-400/10",
        url: (username) => `https://leetcode.com/${username}/`,
    },
    {
        id: "codeforces",
        name: "Codeforces",
        username: "amankr",
        icon: Trophy,
        iconClass: "text-blue-400",
        bgClass: "bg-blue-400/10",
        url: (username) => `https://codeforces.com/profile/${username}`,
    },
    {
        id: "gfg",
        name: "GeeksforGeeks",
        username: "amankr",
        icon: Code2,
        iconClass: "text-emerald-400",
        bgClass: "bg-emerald-400/10",
        url: (username) =>
            `https://www.geeksforgeeks.org/user/${username}/`,
    },
    {
        id: "github",
        name: "GitHub",
        username: "amankr",
        icon: Code2,
        iconClass: "text-slate-200",
        bgClass: "bg-slate-400/10",
        url: (username) => `https://github.com/${username}`,
    },
]


const socialPlatforms = [
    {
        id: "linkedin",
        name: "LinkedIn",
        icon: Building2,
        iconClass: "text-blue-400",
        bgClass: "bg-blue-400/10",
        placeholder: "linkedin username",
        url: (username) =>
            `https://www.linkedin.com/in/${username}`,
    },
    {
        id: "x",
        name: "Twitter / X",
        icon: Globe2,
        iconClass: "text-slate-200",
        bgClass: "bg-slate-400/10",
        placeholder: "x username",
        url: (username) => `https://x.com/${username}`,
    },
    {
        id: "instagram",
        name: "Instagram",
        icon: Globe2,
        iconClass: "text-pink-400",
        bgClass: "bg-pink-400/10",
        placeholder: "instagram username",
        url: (username) =>
            `https://instagram.com/${username}`,
    },
    {
        id: "youtube",
        name: "YouTube",
        icon: Code2,
        iconClass: "text-red-400",
        bgClass: "bg-red-400/10",
        placeholder: "channel username",
        url: (username) =>
            `https://youtube.com/@${username}`,
    },
]


/* ============================================================= */
/* MAIN COMPONENT                                                */
/* ============================================================= */

function StudentProfile() {
    const [profile, setProfile] = useState(initialProfile)

    const [editOpen, setEditOpen] = useState(false)

    const [editForm, setEditForm] =
        useState(initialProfile)

    const [connectedCoding, setConnectedCoding] =
        useState({
            leetcode: true,
            codeforces: true,
            gfg: true,
            github: true,
        })

    const [socialAccounts, setSocialAccounts] =
        useState({
            linkedin: "",
            x: "",
            instagram: "",
            youtube: "",
        })

    const [connectModal, setConnectModal] =
        useState(null)

    const [connectValue, setConnectValue] =
        useState("")


    /* ========================================================= */
    /* PROFILE EDIT                                               */
    /* ========================================================= */

    const openEditProfile = () => {
        setEditForm(profile)
        setEditOpen(true)
    }


    const handleProfileChange = (e) => {
        const { name, value } = e.target

        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const saveProfile = (e) => {
        e.preventDefault()

        setProfile({
            ...editForm,
            name: editForm.name.trim(),
            username: editForm.username
                .trim()
                .replace(/^@/, ""),
            batch: editForm.batch.trim(),
            city: editForm.city.trim(),
            branch: editForm.branch.trim(),
        })

        setEditOpen(false)
    }


    /* ========================================================= */
    /* CODING ACCOUNT ACTIONS                                     */
    /* ========================================================= */

    const disconnectCoding = (id) => {
        setConnectedCoding((prev) => ({
            ...prev,
            [id]: false,
        }))
    }


    const reconnectCoding = (id) => {
        setConnectedCoding((prev) => ({
            ...prev,
            [id]: true,
        }))
    }


    /* ========================================================= */
    /* SOCIAL ACCOUNT ACTIONS                                     */
    /* ========================================================= */

    const openSocialConnect = (platform) => {
        setConnectModal(platform)
        setConnectValue(
            socialAccounts[platform.id] || ""
        )
    }


    const closeSocialModal = () => {
        setConnectModal(null)
        setConnectValue("")
    }


    const saveSocialConnection = (e) => {
        e.preventDefault()

        if (!connectModal) return

        const username = connectValue
            .trim()
            .replace(/^@/, "")

        if (!username) return

        setSocialAccounts((prev) => ({
            ...prev,
            [connectModal.id]: username,
        }))

        closeSocialModal()
    }


    const disconnectSocial = (id) => {
        setSocialAccounts((prev) => ({
            ...prev,
            [id]: "",
        }))
    }


    return (
        <div className="min-h-[calc(100vh-72px)] bg-background px-4 py-5 text-foreground sm:px-6 lg:px-7">

            <div className="mx-auto max-w-[1400px]">

                {/* ================================================= */}
                {/* PROFILE HEADER                                    */}
                {/* ================================================= */}

                <section className="relative mb-5 overflow-hidden rounded-2xl border border-border bg-card">

                    {/* subtle glow */}
                    <div className="pointer-events-none absolute -left-20 -top-32 h-80 w-80 rounded-full bg-primary/[0.10] blur-[100px]" />

                    <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-violet-500/[0.06] blur-[100px]" />

                    {/* subtle grid */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.08]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(99,102,241,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.25) 1px, transparent 1px)",
                            backgroundSize: "42px 42px",
                        }}
                    />

                    <div className="relative flex flex-col gap-7 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

                        {/* Profile Identity */}
                        <div className="flex items-center gap-5 sm:gap-7">

                            {/* Avatar */}
                            <div className="relative shrink-0">

                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/60 bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-extrabold text-white shadow-[0_0_45px_rgba(99,102,241,0.20)] sm:h-28 sm:w-28 sm:text-4xl">
                                    {getInitials(profile.name)}
                                </div>

                                <button
                                    type="button"
                                    onClick={openEditProfile}
                                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-white shadow-lg transition-all hover:bg-indigo-500"
                                    title="Edit profile"
                                >
                                    <Pencil size={13} />
                                </button>

                            </div>


                            {/* Details */}
                            <div className="min-w-0">

                                <div className="flex flex-wrap items-center gap-3">

                                    <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                                        {profile.name}
                                    </h1>

                                    <span className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-primary">
                                        <ShieldCheck size={11} />
                                        Verified
                                    </span>

                                </div>


                                <p className="mt-1.5 flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
                                    <AtSign size={14} />
                                    {profile.username}
                                </p>


                                <div className="mt-5 flex flex-wrap items-center gap-2.5">

                                    <InfoBadge
                                        icon={GraduationCap}
                                        text={`Batch ${profile.batch}`}
                                        primary
                                    />

                                    <InfoBadge
                                        icon={MapPin}
                                        text={profile.city}
                                    />

                                    <InfoBadge
                                        icon={Building2}
                                        text={profile.branch}
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Edit Button */}
                        <button
                            type="button"
                            onClick={openEditProfile}
                            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                        >
                            <Pencil size={15} />
                            Edit Profile
                        </button>

                    </div>
                </section>


                {/* ================================================= */}
                {/* OVERVIEW                                          */}
                {/* ================================================= */}

                <section className="mb-5 rounded-2xl border border-border bg-card p-5 sm:p-6">

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="h-6 w-1 rounded-full bg-primary" />

                                <h2 className="text-lg font-bold">
                                    Overview
                                </h2>

                            </div>

                            <p className="mt-1.5 text-sm text-muted-foreground">
                                Your coding journey at a glance
                            </p>

                        </div>


                        <p className="hidden text-sm italic text-muted-foreground sm:block">
                            “Small steps, big progress.”
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <OverviewCard
                            icon={Globe2}
                            iconClass="text-blue-400"
                            bgClass="bg-blue-400/10"
                            label="Global Rank"
                            value="#1,892"
                            footer="Top 2.1%"
                            footerClass="text-emerald-400"
                        />

                        <OverviewCard
                            icon={Building2}
                            iconClass="text-cyan-400"
                            bgClass="bg-cyan-400/10"
                            label="City Rank"
                            value="#12"
                            footer={profile.city}
                            footerClass="text-muted-foreground"
                        />

                        <OverviewCard
                            icon={Flame}
                            iconClass="text-orange-400"
                            bgClass="bg-orange-400/10"
                            label="Max Streak"
                            value="104 days"
                            footer="All time"
                            footerClass="text-muted-foreground"
                        />

                        <OverviewCard
                            icon={Zap}
                            iconClass="text-violet-400"
                            bgClass="bg-violet-400/10"
                            label="Current Streak"
                            value="18 days"
                            footer="Keep going"
                            footerClass="text-emerald-400"
                        />

                    </div>
                </section>


                {/* ================================================= */}
                {/* CONNECTED CODING ACCOUNTS                       */}
                {/* ================================================= */}

                <section className="mb-5 rounded-2xl border border-border bg-card p-5 sm:p-6">

                    <SectionHeader
                        icon={Code2}
                        title="Connected Coding Accounts"
                        description="Your verified coding profiles"
                    />


                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {codingAccounts.map((account) => {

                            const Icon = account.icon

                            const isConnected =
                                connectedCoding[account.id]

                            return (
                                <CodingAccountCard
                                    key={account.id}
                                    account={account}
                                    Icon={Icon}
                                    isConnected={isConnected}
                                    onConnect={() =>
                                        reconnectCoding(
                                            account.id
                                        )
                                    }
                                    onDisconnect={() =>
                                        disconnectCoding(
                                            account.id
                                        )
                                    }
                                    profileUsername={
                                        account.username
                                    }
                                />
                            )
                        })}

                    </div>

                </section>


                {/* ================================================= */}
                {/* SOCIAL MEDIA                                      */}
                {/* ================================================= */}

                <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">

                    <SectionHeader
                        icon={Link2}
                        title="Social Media Connect"
                        description="Connect your social profiles — completely optional"
                        purple
                    />


                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        {socialPlatforms.map((platform) => {

                            const Icon = platform.icon

                            const username =
                                socialAccounts[
                                platform.id
                                ]

                            const connected =
                                Boolean(username)

                            return (
                                <SocialCard
                                    key={platform.id}
                                    platform={platform}
                                    Icon={Icon}
                                    username={username}
                                    connected={connected}
                                    onConnect={() =>
                                        openSocialConnect(
                                            platform
                                        )
                                    }
                                    onDisconnect={() =>
                                        disconnectSocial(
                                            platform.id
                                        )
                                    }
                                />
                            )
                        })}

                    </div>

                </section>


                {/* Footer */}
                <div className="py-8 text-center">

                    <p className="text-[10px] tracking-wide text-muted-foreground">
                        CodeSync
                        <span className="mx-2 opacity-40">
                            •
                        </span>
                        Track your journey. Build your future.
                    </p>

                </div>

            </div>


            {/* ===================================================== */}
            {/* EDIT PROFILE MODAL                                   */}
            {/* ===================================================== */}

            {editOpen && (
                <ModalOverlay
                    onClose={() => setEditOpen(false)}
                >
                    <form
                        onSubmit={saveProfile}
                        className="w-full max-w-[560px]"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between border-b border-border px-6 py-5">
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Pencil size={16} />
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold">
                                            Edit Profile
                                        </h3>

                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Update your profile information
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setEditOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                            >
                                <X size={17} />
                            </button>
                        </div>


                        {/* Body */}
                        <div className="space-y-6 p-6">

                            {/* ============================== */}
                            {/* PROFILE PHOTO                   */}
                            {/* ============================== */}

                            <div className="flex flex-col items-center">

                                <div className="relative">

                                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-primary/40 bg-gradient-to-br from-indigo-500 to-violet-600 text-3xl font-extrabold text-white shadow-[0_0_35px_rgba(99,102,241,0.20)]">

                                        {profile.photo ? (
                                            <img
                                                src={profile.photo}
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            getInitials(profile.name)
                                        )}

                                    </div>


                                    {/* Upload button */}
                                    <label
                                        htmlFor="profile-photo"
                                        className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-[#0d131f] bg-primary text-white shadow-lg transition-all hover:bg-indigo-500"
                                        title="Upload profile photo"
                                    >
                                        <Pencil size={13} />
                                    </label>

                                    <input
                                        id="profile-photo"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0]

                                            if (!file) return

                                            const imageUrl =
                                                URL.createObjectURL(
                                                    file
                                                )

                                            setProfile((prev) => ({
                                                ...prev,
                                                photo: imageUrl,
                                            }))
                                        }}
                                    />

                                </div>


                                <p className="mt-3 text-xs font-medium text-foreground">
                                    Profile Photo
                                </p>

                                <p className="mt-1 text-[10px] text-muted-foreground">
                                    JPG, PNG or WEBP · Max 5MB
                                </p>

                            </div>


                            {/* ============================== */}
                            {/* EDITABLE INFORMATION           */}
                            {/* ============================== */}

                            <div>

                                <div className="mb-3 flex items-center gap-2">
                                    <div className="h-4 w-1 rounded-full bg-primary" />

                                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                                        Editable Information
                                    </p>
                                </div>


                                <div className="rounded-xl border border-primary/20 bg-primary/[0.025] p-4">

                                    <ModalInput
                                        label="Full Name"
                                        name="name"
                                        value={editForm.name}
                                        onChange={
                                            handleProfileChange
                                        }
                                        icon={User}
                                        editable
                                    />

                                </div>

                            </div>


                            {/* ============================== */}
                            {/* ACCOUNT INFORMATION             */}
                            {/* ============================== */}

                            <div>

                                <div className="mb-3 flex items-center gap-2">
                                    <div className="h-4 w-1 rounded-full bg-slate-600" />

                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Account Information
                                    </p>
                                </div>


                                <div className="space-y-3">

                                    <ModalInput
                                        label="Username"
                                        name="username"
                                        value={
                                            editForm.username
                                        }
                                        onChange={
                                            handleProfileChange
                                        }
                                        icon={AtSign}
                                        disabled
                                    />


                                    <ModalInput
                                        label="Email"
                                        name="email"
                                        value="aman.kumar@codesync.edu"
                                        icon={Globe2}
                                        disabled
                                    />

                                </div>

                            </div>


                            {/* ============================== */}
                            {/* INSTITUTE INFORMATION           */}
                            {/* ============================== */}

                            <div>

                                <div className="mb-3 flex items-center gap-2">
                                    <div className="h-4 w-1 rounded-full bg-slate-600" />

                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Institute Information
                                    </p>
                                </div>


                                <div className="grid gap-3 sm:grid-cols-2">

                                    <ModalInput
                                        label="Batch"
                                        name="batch"
                                        value={editForm.batch}
                                        onChange={
                                            handleProfileChange
                                        }
                                        icon={GraduationCap}
                                        disabled
                                    />


                                    <ModalInput
                                        label="City"
                                        name="city"
                                        value={editForm.city}
                                        onChange={
                                            handleProfileChange
                                        }
                                        icon={MapPin}
                                        disabled
                                    />


                                    <div className="sm:col-span-2">

                                        <ModalInput
                                            label="Branch"
                                            name="branch"
                                            value={editForm.branch}
                                            onChange={
                                                handleProfileChange
                                            }
                                            icon={Building2}
                                            disabled
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* ============================== */}
                            {/* NOTICE                          */}
                            {/* ============================== */}

                            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-3.5">

                                <ShieldCheck
                                    size={16}
                                    className="mt-0.5 shrink-0 text-primary"
                                />

                                <div>

                                    <p className="text-xs font-semibold text-foreground">
                                        Account details are protected
                                    </p>

                                    <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                                        Username, email and institute
                                        information can only be changed
                                        through your account administrator.
                                    </p>

                                </div>

                            </div>


                            {/* ============================== */}
                            {/* ACTIONS                         */}
                            {/* ============================== */}

                            <div className="flex gap-3 border-t border-border pt-5">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditOpen(false)
                                    }
                                    className="h-11 flex-1 rounded-xl border border-border bg-secondary text-sm font-semibold text-muted-foreground transition-all hover:border-slate-600 hover:text-foreground"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-[0_8px_25px_rgba(99,102,241,0.18)] transition-all hover:bg-indigo-500"
                                >
                                    <Save size={15} />
                                    Save Changes
                                </button>

                            </div>

                        </div>
                    </form>
                </ModalOverlay>
            )}


            {/* ===================================================== */}
            {/* SOCIAL CONNECT MODAL                                 */}
            {/* ===================================================== */}

            {connectModal && (
                <ModalOverlay
                    onClose={closeSocialModal}
                >

                    <form
                        onSubmit={saveSocialConnection}
                        className="w-full max-w-md"
                    >

                        <ModalHeader
                            title={`Connect ${connectModal.name}`}
                            description={`Add your ${connectModal.name} profile to CodeSync.`}
                            onClose={closeSocialModal}
                        />


                        <div className="p-6">

                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Username
                            </label>


                            <div className="flex h-12 items-center gap-2 rounded-xl border border-border bg-[#101622] px-4 transition-all focus-within:border-primary/50">

                                <span className="font-mono text-sm text-slate-500">
                                    @
                                </span>

                                <input
                                    autoFocus
                                    type="text"
                                    value={connectValue}
                                    onChange={(e) =>
                                        setConnectValue(
                                            e.target.value
                                        )
                                    }
                                    placeholder={
                                        connectModal.placeholder
                                    }
                                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-slate-600"
                                />

                            </div>


                            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck
                                    size={13}
                                    className="text-emerald-400"
                                />
                                Your social profile is optional.
                            </p>


                            <div className="mt-6 flex gap-3">

                                <button
                                    type="button"
                                    onClick={closeSocialModal}
                                    className="h-11 flex-1 rounded-xl border border-border bg-secondary text-sm font-semibold text-muted-foreground hover:text-foreground"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={
                                        !connectValue.trim()
                                    }
                                    className={`h-11 flex-1 rounded-xl text-sm font-semibold transition-all ${connectValue.trim()
                                        ? "bg-primary text-white hover:bg-indigo-500"
                                        : "cursor-not-allowed bg-secondary text-muted-foreground"
                                        }`}
                                >
                                    Connect
                                </button>

                            </div>

                        </div>

                    </form>

                </ModalOverlay>
            )}

        </div>
    )
}


/* ============================================================= */
/* PROFILE INITIALS                                             */
/* ============================================================= */

function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
}


/* ============================================================= */
/* INFO BADGE                                                    */
/* ============================================================= */

function InfoBadge({
    icon: Icon,
    text,
    primary = false,
}) {
    return (
        <span
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold ${primary
                ? "bg-primary text-white"
                : "border border-border bg-secondary text-muted-foreground"
                }`}
        >
            <Icon size={14} />
            {text}
        </span>
    )
}


/* ============================================================= */
/* SECTION HEADER                                                */
/* ============================================================= */

function SectionHeader({
    icon: Icon,
    title,
    description,
    purple = false,
}) {
    return (
        <div className="flex items-center gap-3">

            <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${purple
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-primary/10 text-primary"
                    }`}
            >
                <Icon size={19} />
            </div>

            <div>

                <h2 className="text-lg font-bold">
                    {title}
                </h2>

                <p className="mt-0.5 text-sm text-muted-foreground">
                    {description}
                </p>

            </div>

        </div>
    )
}


/* ============================================================= */
/* OVERVIEW CARD                                                 */
/* ============================================================= */

function OverviewCard({
    icon: Icon,
    iconClass,
    bgClass,
    label,
    value,
    footer,
    footerClass,
}) {
    return (
        <div className="group rounded-xl border border-border bg-[#0d131f] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-muted-foreground">
                        {label}
                    </p>

                    <p className="mt-2.5 text-2xl font-extrabold tracking-tight">
                        {value}
                    </p>

                </div>


                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass} ${iconClass}`}
                >
                    <Icon size={20} />
                </div>

            </div>


            <p
                className={`mt-4 text-xs font-semibold ${footerClass}`}
            >
                {footer}
            </p>

        </div>
    )
}


/* ============================================================= */
/* CODING ACCOUNT CARD                                          */
/* ============================================================= */

function CodingAccountCard({
    account,
    Icon,
    isConnected,
    onConnect,
    onDisconnect,
    profileUsername,
}) {
    return (
        <div className="rounded-xl border border-border bg-[#0d131f] p-5 transition-all duration-200 hover:border-primary/25">

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${account.bgClass} ${account.iconClass}`}
                    >
                        <Icon size={20} />
                    </div>


                    <div>

                        <p className="text-sm font-bold">
                            {account.name}
                        </p>

                        <div className="mt-1.5 flex items-center gap-2">

                            <span
                                className={`h-2 w-2 rounded-full ${isConnected
                                    ? "bg-emerald-400"
                                    : "bg-slate-600"
                                    }`}
                            />

                            <span
                                className={`text-xs font-medium ${isConnected
                                    ? "text-emerald-400"
                                    : "text-muted-foreground"
                                    }`}
                            >
                                {isConnected
                                    ? "Connected"
                                    : "Not connected"}
                            </span>

                        </div>

                    </div>

                </div>


                {isConnected && (
                    <Check
                        size={16}
                        className="text-emerald-400"
                    />
                )}

            </div>


            {isConnected ? (
                <>

                    <div className="mt-5 flex items-center justify-between">

                        <span className="font-mono text-xs text-muted-foreground">
                            @{profileUsername}
                        </span>


                        <a
                            href={account.url(
                                profileUsername
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                            title={`Open ${account.name}`}
                        >
                            <ExternalLink size={16} />
                        </a>

                    </div>


                    <button
                        type="button"
                        onClick={onDisconnect}
                        className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary text-xs font-medium text-muted-foreground transition-all hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-400"
                    >
                        <Unlink size={13} />
                        Disconnect
                    </button>

                </>
            ) : (

                <button
                    type="button"
                    onClick={onConnect}
                    className="mt-5 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary/10 text-xs font-semibold text-primary transition-all hover:bg-primary/15"
                >
                    <Link2 size={13} />
                    Connect Account
                </button>

            )}

        </div>
    )
}


/* ============================================================= */
/* SOCIAL CARD                                                   */
/* ============================================================= */

function SocialCard({
    platform,
    Icon,
    username,
    connected,
    onConnect,
    onDisconnect,
}) {
    return (
        <div
            className={`rounded-xl border p-5 transition-all ${connected
                ? "border-emerald-400/20 bg-emerald-400/[0.025]"
                : "border-border bg-[#0d131f]"
                }`}
        >

            <div className="flex items-center gap-3">

                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${platform.bgClass} ${platform.iconClass}`}
                >
                    <Icon size={20} />
                </div>


                <div>

                    <p className="text-sm font-bold">
                        {platform.name}
                    </p>

                    <div className="mt-1.5 flex items-center gap-2">

                        <span
                            className={`h-2 w-2 rounded-full ${connected
                                ? "bg-emerald-400"
                                : "bg-slate-600"
                                }`}
                        />

                        <span
                            className={`text-xs ${connected
                                ? "text-emerald-400"
                                : "text-muted-foreground"
                                }`}
                        >
                            {connected
                                ? "Connected"
                                : "Not connected"}
                        </span>

                    </div>

                </div>

            </div>


            {connected ? (

                <div className="mt-5 flex items-center justify-between">

                    <span className="font-mono text-xs text-muted-foreground">
                        @{username}
                    </span>

                    <button
                        type="button"
                        onClick={onDisconnect}
                        className="text-xs font-medium text-muted-foreground transition-colors hover:text-red-400"
                    >
                        Remove
                    </button>

                </div>

            ) : (

                <button
                    type="button"
                    onClick={onConnect}
                    className="mt-5 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary text-xs font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                    <Link2 size={13} />
                    Connect
                </button>

            )}

        </div>
    )
}


/* ============================================================= */
/* MODAL OVERLAY                                                 */
/* ============================================================= */

function ModalOverlay({
    children,
    onClose,
}) {
    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onMouseDown={onClose}
        >

            <div
                className="relative max-h-[90vh] w-full overflow-y-auto rounded-2xl border border-border bg-[#0d131f] shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
                onMouseDown={(e) =>
                    e.stopPropagation()
                }
            >
                {children}
            </div>

        </div>
    )
}


/* ============================================================= */
/* MODAL HEADER                                                  */
/* ============================================================= */

function ModalHeader({
    title,
    description,
    onClose,
}) {
    return (
        <div className="flex items-start justify-between border-b border-border p-6">

            <div>

                <h3 className="text-lg font-bold">
                    {title}
                </h3>

                <p className="mt-1.5 text-sm text-muted-foreground">
                    {description}
                </p>

            </div>


            <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
                <X size={16} />
            </button>

        </div>
    )
}


/* ============================================================= */
/* MODAL INPUT                                                   */
/* ============================================================= */

function ModalInput({
    label,
    name,
    value,
    onChange,
    icon: Icon,
    disabled = false,
    editable = false,
}) {
    return (
        <div>

            <div className="mb-2 flex items-center justify-between">

                <label
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                        disabled
                            ? "text-slate-500"
                            : "text-slate-400"
                    }`}
                >
                    {label}
                </label>


                {editable && (
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-primary">
                        Editable
                    </span>
                )}


                {disabled && (
                    <span className="text-[9px] text-slate-600">
                        Locked
                    </span>
                )}

            </div>


            <div
                className={`flex h-11 items-center gap-3 rounded-xl border px-3.5 transition-all ${
                    disabled
                        ? "cursor-not-allowed border-border bg-[#0a0f18] opacity-60"
                        : "border-border bg-[#101622] focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/10"
                }`}
            >

                <Icon
                    size={16}
                    className={
                        disabled
                            ? "shrink-0 text-slate-600"
                            : "shrink-0 text-slate-500"
                    }
                />


                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full bg-transparent text-sm outline-none ${
                        disabled
                            ? "cursor-not-allowed text-slate-500"
                            : "text-foreground"
                    }`}
                />

                {disabled && (
                    <ShieldCheck
                        size={14}
                        className="shrink-0 text-slate-600"
                    />
                )}

            </div>

        </div>
    )
}


export default StudentProfile