.PHONY: build clean deploy lint start

node_modules:
	@npm install

start:
	@node_modules/.bin/parcel -p 4002 index.html

build:
	@node_modules/.bin/parcel build index.html --public-url ./

deploy:
	@aws s3 sync ./dist/ s3://nyan-jack.joshbassett.info/ --acl public-read --delete --cache-control 'max-age=300'

lint:
	@node_modules/.bin/standard

clean:
	@rm -rf dist node_modules sounds.*
