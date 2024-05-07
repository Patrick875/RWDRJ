import AnimatePage from "../../Shared/AnimatePage";
import MoreLinks from "../../Shared/MoreLinks";

function DigitalHealthSHSR() {
	return (
		<AnimatePage>
			<div className="">
				<div className="flex flex-col items-center justify-center w-full h-56 bg-center bg-cover ">
					<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-page-cover">
						<p className="w-5/6 text-xl font-bold text-center text-white">
							Digital Health & SRHR
						</p>
					</div>
				</div>

				<div className="w-5/6 mx-auto ">
					<p className="my-2 text-lg font-extrabold text-center text-sky-900 ">
						Digital Health & SRHR{" "}
					</p>
					<div className="p-3 bg-white">
						<p className="p-3 text-xs ">
							The COVID-19 pandemic has shown us that remote therapy works. It
							helps people feel safe "especially those who wants to be
							anonymous".
						</p>
						<p className="p-3 text-xs leading-6 ">
							Telehealth increases access to healthcare in many ways. One is
							connecting people in need of care to providers. Many people in
							need of sexual reproductive services feel safe when they know
							exactly where they can obtain the services. Others may not be able
							to afford travel. In Rwanda's context, obtaining a legal safe
							abortion is already quite a decision because it means coming face
							to face with a doctor. This simply means a possibility of
							discrimination and harassment as someone navigates the process.
							These stressors increase anxiety, depression, post-traumatic
							stress disorder, and a range of other issues. We don't mention the
							risk of resorting to more clandestine methods that may result in
							fatal outcomes.
						</p>
						<p className="p-3 text-xs leading-6 ">
							Our group aims to create a virtual safe space for women and girls
							seeking safe abortion care in a legal context. We have mobilized
							digital women experts to take active roles in our group. The
							development of a transformative feminist digital technology will
							provide a virtual safe path to service and dignified care for
							women in Rwanda.
						</p>
					</div>
					<div>
						<p className="my-2 text-lg font-extrabold text-sky-900 ">
							Gallery{" "}
						</p>
						<p className="text-xs ">Items yet to be added</p>
					</div>
					<MoreLinks current="Digital Health & SRHR" />
				</div>
			</div>
		</AnimatePage>
	);
}

export default DigitalHealthSHSR;
