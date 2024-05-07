import AnimatePage from "../../Shared/AnimatePage";
import { objectives } from "../../constants";

function WhoWeAre() {
	return (
		<AnimatePage>
			<div className="">
				<div className="flex flex-col items-center justify-center w-full h-[60vh] bg-center bg-cover bg-image-whoweare">
					<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-[rgba(244,244,249,0.70)]">
						<p className="w-5/6 text-3xl font-bold text-center text-black font-lora">
							We are women pro-choice Doctors
						</p>
					</div>
				</div>

				<div className="">
					<div className=" h-[40vh] flex flex-col justify-center bg-primary-orangeTrans ">
						<section className="w-5/6 py-3 mx-auto text-2xl font-bold text-center font-lora">
							We are a network of young women physicians in Rwanda. We share the
							spirit of activism driven by the passion for radically advancing
							women's access to sexual and reproductive rights
						</section>
					</div>
					<section className="text-lg text-white bg-blue-900 ">
						<div className="w-5/6 py-6 mx-auto">
							<p className="py-3 ">
								Feminism is at the heart of our radical approach. Doctors are
								the most influencing individuals when it comes to abortion.
								Additionally, women are the most well positioned to speak out
								against the injustice they face.Rwanda Women Doctors For
								Reproductive Justice was initiated in 2021 by young feminists to
								create a network of pro-choice women physicians who are
								progressive enough to provide legal, safe abortion services. The
								aim was to unite and empower women to support women.
							</p>
							<p className="py-3 ">
								Our approach is unique and inspiring. Through creativity,
								organizing, and a sense of solidarity, we created a movement of
								resistance to inequity spearheaded by feminists.
							</p>
							<p className="py-3 ">
								We know well that not everyone is ready to taste changes brought
								by the feminist movements. Many are afraid to face women who
								exercise their full rights to decide about their bodies. Many
								groups are unwilling to openly and comprehensively address
								abortion rights and legal access issues. This is because, in
								reality, the power to decide is embedded in a patriarchal
								system, and women continue to suffer from limited access to
								legal services. At RWDFRJ, we believe there is a need to shift
								the power to the most vulnerable and most affected. We
								prioritize collaborative care and protect our members from
								external threats and harassment.
							</p>
						</div>
					</section>
					<section className="w-full h-[80vh]">
						<div className="flex flex-col justify-center w-5/6 h-full mx-auto">
							<div className="flex ">
								<div className="w-1/2">
									<img
										loading="lazy"
										className="block h-96 object-contain rounded-[10px] "
										src="https://res.cloudinary.com/didikwl4i/image/upload/v1708953557/RWDJ-IMAGES/graphic_y9v2fr.png"
										alt="woman-graphic"
									/>
								</div>
								<div className="w-1/2 py-8">
									<p className="py-1 my-4 text-2xl font-lora ">Mission</p>
									<p className="text-lg">
										The ultimate mission is to create and strengthen a feminist
										network of girls and young women to advance bodily autonomy
										and sexual reproductive rights.
									</p>
									<p className="py-1 my-4 text-2xl font-lora ">Vision</p>
									<p className="text-lg">
										We envision a future where every woman is free to express
										themselves authentically, free to choose, free from
										violence, able to achieve the highest attainable success,
										equal access to healthcare, protected and respected , safe
										space.
									</p>
								</div>
							</div>
						</div>
					</section>
					<section className="bg-[rgba(41,49,73)]">
						<div className="flex w-5/6 mx-auto h-[110vh] ">
							<div className="w-1/2 py-3">
								<p className="py-1 my-4 text-2xl text-white font-lora">
									Our Objectives
								</p>
								<ol className="list-disc ">
									{objectives &&
										objectives.map((el, i) => (
											<li key={i} className="py-2 text-lg text-white ps-0">
												{el}
											</li>
										))}
								</ol>
							</div>
							<div className="flex flex-col items-center justify-center w-1/2 h-full px-2 py-4">
								<img
									loading="lazy"
									className="block h-96 object-contain rounded-[10px] "
									src="https://res.cloudinary.com/didikwl4i/image/upload/v1708953659/RWDJ-IMAGES/training5_si2dnf.webp"
									alt="woman-graphic"
								/>
							</div>
						</div>
					</section>
				</div>
			</div>
		</AnimatePage>
	);
}

export default WhoWeAre;
